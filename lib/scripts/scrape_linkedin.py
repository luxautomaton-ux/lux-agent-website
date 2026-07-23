#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
LinkedIn Scraper script that fetches recent posts from a profile page,
including titles, text content, image/photo URLs, reaction counts, and comment counts.
Saves the results directly to lib/scraped-news.json.
"""

import os
import json
import time
from datetime import datetime

# Try loading .env variables if python-dotenv is available
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup as bs

def load_cookies(browser, file_path):
    if not os.path.exists(file_path):
        print(f"[!] Cookies file not found at {file_path}")
        return False
        
    print(f"[*] Loading cookies from {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            if not line.startswith('#') and line.strip():
                fields = line.strip().split('\t')
                if len(fields) == 7:
                    cookie = {
                        'domain': fields[0],
                        'flag': fields[1],
                        'path': fields[2],
                        'secure': fields[3],
                        'expiration': fields[4],
                        'name': fields[5],
                        'value': fields[6]
                    }
                    try:
                        browser.add_cookie({
                            'name': cookie['name'],
                            'value': cookie['value'],
                            'domain': cookie['domain'],
                            'path': cookie['path'],
                            'expiry': int(cookie['expiration']) if cookie['expiration'].isdigit() else None
                        })
                    except Exception as e:
                        # Ignore domain mismatches during initial load
                        pass
    return True

def convert_abbreviated_to_number(s):
    s = s.upper().strip()
    if 'K' in s:
        return int(float(s.replace('K', '')) * 1000)
    elif 'M' in s:
        return int(float(s.replace('M', '')) * 1000000)
    else:
        try:
            return int(s)
        except ValueError:
            return 0

def main():
    # --------------------------------
    # Configurations
    # --------------------------------
    # Config from environment or fallbacks
    user_profile_url = os.getenv("LINKEDIN_PROFILE_URL", "https://www.linkedin.com/in/asapritchard/recent-activity/all/")
    cookies_file = os.getenv("LINKEDIN_COOKIES_FILE", "linkedin_cookies.txt")
    output_json_file = "lib/scraped-news.json"
    MAX_POSTS = int(os.getenv("LINKEDIN_MAX_POSTS", "10"))
    MAX_SCROLL_ATTEMPTS = int(os.getenv("LINKEDIN_MAX_SCROLL_ATTEMPTS", "20"))
    
    print(f"[*] Target Profile URL: {user_profile_url}")
    print(f"[*] Cookies File: {cookies_file}")
    
    # --------------------------------
    # Set up Chrome (headless) driver
    # --------------------------------
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    
    print("[*] Initializing Chrome driver...")
    browser = webdriver.Chrome(options=chrome_options)
    browser.set_window_size(1920, 1080)
    
    # Go to home first to set domain scope for cookies
    browser.get('https://www.linkedin.com/')
    time.sleep(2)
    
    # Load cookies
    if not load_cookies(browser, cookies_file):
        print("[!] Scraping aborted due to missing cookies file.")
        print("[i] Please export your cookies from LinkedIn and save them as 'linkedin_cookies.txt'.")
        browser.quit()
        return

    browser.refresh()
    time.sleep(3)
    
    # Ensure page is loaded / cookies applied
    try:
        WebDriverWait(browser, 15).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "#global-nav, .nav__button-secondary"))
        )
        print("[*] Navigation/Home page resolved after cookies loaded.")
    except TimeoutException:
        print("[!] Failed to verify LinkedIn authentication structure. Trying to proceed anyway...")
        
    # Navigate to the target profile
    print(f"[*] Navigating to {user_profile_url} ...")
    browser.get(user_profile_url)
    time.sleep(5)  # Allow page layout to settle
    
    scraped_posts = []
    unique_post_ids = set()
    scroll_attempts = 0
    no_new_posts_count = 0
    
    print("[*] Starting scroll-and-scrape feed loop...")
    while len(scraped_posts) < MAX_POSTS and scroll_attempts < MAX_SCROLL_ATTEMPTS:
        soup = bs(browser.page_source, "html.parser")
        
        # LinkedIn feed post elements usually are within div.feed-shared-update-v2
        # or inside articles with data-urn
        post_wrappers = soup.find_all("div", {"class": "feed-shared-update-v2"})
        if not post_wrappers:
            # Fallback wrapper lookup
            post_wrappers = soup.find_all("article", {"class": "feed-shared-update-v2"})
            
        new_posts_in_this_pass = 0
        
        for pw in post_wrappers:
            # 1) Get Post ID
            post_id = None
            post_url = None
            
            detail_link_tag = pw.find("a", {"class": "update-components-mini-update-v2__link-to-details-page"})
            if detail_link_tag and detail_link_tag.get("href"):
                post_url = detail_link_tag["href"].strip()
                if "urn:li:activity:" in post_url:
                    post_id = post_url.split("urn:li:activity:")[-1].replace("/", "")
            
            if not post_id:
                data_urn = pw.get("data-urn", "")
                if "urn:li:activity:" in data_urn:
                    post_id = data_urn.split("urn:li:activity:")[-1]
                    
            if not post_id:
                continue
                
            if post_id in unique_post_ids:
                continue
                
            unique_post_ids.add(post_id)
            new_posts_in_this_pass += 1
            
            if post_url and post_url.startswith("/feed/update/"):
                post_url = "https://www.linkedin.com" + post_url
            elif not post_url:
                post_url = f"https://www.linkedin.com/feed/update/urn:li:activity:{post_id}"
                
            # 2) Author Information
            author_name = None
            author_profile_link = None
            author_jobtitle = None
            post_time = None
            
            actor_container = pw.find("div", {"class": "update-components-actor__container"})
            if actor_container:
                # Name
                name_tag = actor_container.find("span", {"class": "update-components-actor__title"})
                if name_tag:
                    inner_span = name_tag.find("span", {"dir": "ltr"})
                    if inner_span:
                        author_name = inner_span.get_text(strip=True)
                
                # Profile link
                actor_link = actor_container.find("a", {"class": "update-components-actor__meta-link"})
                if actor_link and actor_link.get("href"):
                    author_profile_link = actor_link["href"].strip()
                    if author_profile_link.startswith("/in/"):
                        author_profile_link = "https://www.linkedin.com" + author_profile_link
                        
                # Job Title
                jobtitle_tag = actor_container.find("span", {"class": "update-components-actor__description"})
                if jobtitle_tag:
                    author_jobtitle = jobtitle_tag.get_text(strip=True)
                    
                # Time published
                time_tag = actor_container.find("span", {"class": "update-components-actor__sub-description"})
                if time_tag:
                    # Clean up time string (removing metadata like "• Edited")
                    raw_time = time_tag.get_text(strip=True)
                    if "•" in raw_time:
                        raw_time = raw_time.split("•")[0].strip()
                    post_time = raw_time
            
            # Default fallbacks if selector structures shift
            if not author_name:
                name_tag = pw.find("span", {"class": "feed-shared-actor__title"})
                if name_tag:
                    author_name = name_tag.get_text(strip=True)
                    
            # 3) Post Text Content
            post_content = None
            content_div = pw.find("div", {"class": "update-components-text"})
            if content_div:
                post_content = content_div.get_text(separator="\n", strip=True)
            else:
                # Fallback content selector
                content_div = pw.find("span", {"class": "break-words"})
                if content_div:
                    post_content = content_div.get_text(separator="\n", strip=True)
            
            # 4) Post Image / Photo
            post_image = None
            
            # Try specific shared image containers
            img_tag = pw.find("img", {"class": "update-components-image__image"})
            if img_tag and img_tag.get("src"):
                post_image = img_tag["src"].strip()
                
            if not post_image:
                img_tag = pw.find("img", {"class": "update-components-article__image"})
                if img_tag and img_tag.get("src"):
                    post_image = img_tag["src"].strip()
                    
            if not post_image:
                # Look for general feed shared image container
                container = pw.find("div", {"class": "feed-shared-image__container"})
                if container:
                    img_tag = container.find("img")
                    if img_tag and img_tag.get("src"):
                        post_image = img_tag["src"].strip()
                        
            if not post_image:
                # Check for adaptive view elements
                img_tag = pw.find("img", {"class": "ivm-view-attr__img--adaptive"})
                if img_tag and img_tag.get("src") and not "ghost" in img_tag["src"] and not "profile" in img_tag["src"]:
                    post_image = img_tag["src"].strip()
            
            # 5) Reactions & Comments Count
            post_reactions = 0
            post_comments = 0
            
            social_counts = pw.find("div", {"class": "social-details-social-counts"})
            if social_counts:
                # Reactions count
                reaction_item = social_counts.find("li", {"class": "social-details-social-counts__reactions"})
                if reaction_item:
                    btn = reaction_item.find("button")
                    if btn and btn.has_attr("aria-label"):
                        raw_reactions = btn["aria-label"].split(" ")[0]
                        post_reactions = convert_abbreviated_to_number(raw_reactions)
                
                # Comments count
                comment_item = social_counts.find("li", {"class": "social-details-social-counts__comments"})
                if comment_item:
                    btn = comment_item.find("button")
                    if btn and btn.has_attr("aria-label"):
                        raw_comments = btn["aria-label"].split(" ")[0]
                        post_comments = convert_abbreviated_to_number(raw_comments)
                        
            # Store Structured Post
            post_entry = {
                "id": post_id,
                "url": post_url,
                "author": author_name or "Asa Spade",
                "authorProfile": author_profile_link or "https://www.linkedin.com/in/asapritchard/",
                "authorRole": author_jobtitle or "Founder, Lux Automaton",
                "time": post_time or "Recently",
                "content": post_content or "",
                "reactions": post_reactions,
                "comments": post_comments,
                "image": post_image,
                "dateCollected": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
            }
            
            print(f"[+] Scraped Post {post_id} | Reactions: {post_reactions} | Comments: {post_comments}")
            scraped_posts.append(post_entry)
            
            if len(scraped_posts) >= MAX_POSTS:
                break
                
        if new_posts_in_this_pass == 0:
            no_new_posts_count += 1
            if no_new_posts_count >= 3:
                print("[*] No new posts found in 3 consecutive scrolls. Ending scrape.")
                break
        else:
            no_new_posts_count = 0
            
        if len(scraped_posts) < MAX_POSTS:
            print("[*] Scrolling down to load older posts...")
            browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(4)
            scroll_attempts += 1
            
    print(f"[*] Completed. Scraped {len(scraped_posts)} unique posts.")
    browser.quit()
    
    # Save directly to output JSON file
    if scraped_posts:
        # Create lib folder if not exists
        os.makedirs(os.path.dirname(output_json_file), exist_ok=True)
        with open(output_json_file, 'w', encoding='utf-8') as f:
            json.dump(scraped_posts, f, indent=2, ensure_ascii=False)
        print(f"[*] Success! Saved scraped posts to {output_json_file}")
    else:
        print("[!] No posts scraped. Output file was not updated.")

if __name__ == "__main__":
    main()

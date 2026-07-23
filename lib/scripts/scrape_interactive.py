#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Interactive LinkedIn Scraper script that launches Chrome non-headlessly,
allowing the user to log in if needed. Once logged in and on the target feed page,
it automatically scrapes the posts and saves the output to lib/scraped-news.json.
Uses a local profile folder to remember the login session for future runs.
"""

import os
import json
import time
from datetime import datetime

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup as bs

def convert_abbreviated_to_number(s):
    s = s.upper().strip()
    if 'K' in s:
        return int(float(s.replace('K', '')) * 1000)
    elif 'M' in s:
        return int(float(s.replace('M', '')) * 1000000)
    else:
        try:
            return int(s.replace(',', ''))
        except ValueError:
            return 0

def main():
    print("[*] Starting Interactive LinkedIn Scraper...")
    
    chrome_options = Options()
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    
    # Use a local chrome profile directory in the project to persist session/cookies
    project_profile_dir = os.path.abspath("lib/scripts/chrome_profile")
    os.makedirs(project_profile_dir, exist_ok=True)
    chrome_options.add_argument(f"user-data-dir={project_profile_dir}")
    
    print("[*] Launching Google Chrome window...")
    browser = webdriver.Chrome(options=chrome_options)
    browser.set_window_size(1400, 900)
    
    target_url = "https://www.linkedin.com/in/asapritchard/recent-activity/all/"
    print(f"[*] Navigating to {target_url}...")
    browser.get(target_url)
    
    print("\n" + "="*70)
    print("[!] ACTION REQUIRED:")
    print("If you are not logged in, please LOG IN to your LinkedIn account in the Chrome window.")
    print("Once you log in, the page will redirect to your recent activity feed.")
    print("The script will automatically detect the feed and begin scraping.")
    print("="*70 + "\n")
    
    logged_in = False
    # Wait up to 3 minutes for user login and redirect
    for i in range(180):
        current_url = browser.current_url
        if "recent-activity" in current_url:
            # Look for feed updates to confirm loading
            try:
                feed_elements = browser.find_elements(By.CSS_SELECTOR, "div.feed-shared-update-v2, article.feed-shared-update-v2")
                if feed_elements:
                    logged_in = True
                    print("[+] Logged in session detected! Starting scraping sequence...")
                    break
            except Exception:
                pass
        time.sleep(1)
        
    if not logged_in:
        print("[!] Timeout or feed not found. Aborting.")
        browser.quit()
        return

    print("[*] Scrolling to load feed posts...")
    # Scroll down 6 times with a delay to let images and posts load
    for i in range(6):
        browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        print(f"[*] Scrolled {i+1}/6 times...")
        time.sleep(3)
        
    print("[*] Parsing page content...")
    soup = bs(browser.page_source, "html.parser")
    post_wrappers = soup.find_all("div", {"class": "feed-shared-update-v2"})
    if not post_wrappers:
        post_wrappers = soup.find_all("article", {"class": "feed-shared-update-v2"})
        
    scraped_posts = []
    unique_post_ids = set()
    
    for pw in post_wrappers:
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
        
        if post_url and post_url.startswith("/feed/update/"):
            post_url = "https://www.linkedin.com" + post_url
        elif not post_url:
            post_url = f"https://www.linkedin.com/feed/update/urn:li:activity:{post_id}"
            
        # Defaults
        author_name = "Asa Pritchard"
        author_profile_link = "https://www.linkedin.com/in/asapritchard/"
        author_jobtitle = "Founder, Lux Automaton"
        post_time = "Recently"
        
        actor_container = pw.find("div", {"class": "update-components-actor__container"})
        if actor_container:
            name_tag = actor_container.find("span", {"class": "update-components-actor__title"})
            if name_tag:
                inner_span = name_tag.find("span", {"dir": "ltr"})
                if inner_span:
                    author_name = inner_span.get_text(strip=True)
            
            actor_link = actor_container.find("a", {"class": "update-components-actor__meta-link"})
            if actor_link and actor_link.get("href"):
                author_profile_link = actor_link["href"].strip()
                if author_profile_link.startswith("/in/"):
                    author_profile_link = "https://www.linkedin.com" + author_profile_link
                    
            jobtitle_tag = actor_container.find("span", {"class": "update-components-actor__description"})
            if jobtitle_tag:
                author_jobtitle = jobtitle_tag.get_text(strip=True)
                
            time_tag = actor_container.find("span", {"class": "update-components-actor__sub-description"})
            if time_tag:
                raw_time = time_tag.get_text(strip=True)
                if "•" in raw_time:
                    raw_time = raw_time.split("•")[0].strip()
                post_time = raw_time
        
        post_content = None
        content_div = pw.find("div", {"class": "update-components-text"})
        if content_div:
            post_content = content_div.get_text(separator="\n", strip=True)
        else:
            content_div = pw.find("span", {"class": "break-words"})
            if content_div:
                post_content = content_div.get_text(separator="\n", strip=True)
        
        post_image = None
        img_tag = pw.find("img", {"class": "update-components-image__image"})
        if img_tag and img_tag.get("src"):
            post_image = img_tag["src"].strip()
            
        if not post_image:
            img_tag = pw.find("img", {"class": "update-components-article__image"})
            if img_tag and img_tag.get("src"):
                post_image = img_tag["src"].strip()
                
        if not post_image:
            container = pw.find("div", {"class": "feed-shared-image__container"})
            if container:
                img_tag = container.find("img")
                if img_tag and img_tag.get("src"):
                    post_image = img_tag["src"].strip()
                    
        if not post_image:
            img_tag = pw.find("img", {"class": "ivm-view-attr__img--adaptive"})
            if img_tag and img_tag.get("src") and not "ghost" in img_tag["src"] and not "profile" in img_tag["src"]:
                post_image = img_tag["src"].strip()
        
        post_reactions = 0
        post_comments = 0
        
        social_counts = pw.find("div", {"class": "social-details-social-counts"})
        if social_counts:
            reaction_item = social_counts.find("li", {"class": "social-details-social-counts__reactions"})
            if reaction_item:
                btn = reaction_item.find("button")
                if btn and btn.has_attr("aria-label"):
                    raw_reactions = btn["aria-label"].split(" ")[0]
                    post_reactions = convert_abbreviated_to_number(raw_reactions)
            
            comment_item = social_counts.find("li", {"class": "social-details-social-counts__comments"})
            if comment_item:
                btn = comment_item.find("button")
                if btn and btn.has_attr("aria-label"):
                    raw_comments = btn["aria-label"].split(" ")[0]
                    post_comments = convert_abbreviated_to_number(raw_comments)
                    
        post_entry = {
            "id": post_id,
            "url": post_url,
            "author": author_name,
            "authorProfile": author_profile_link,
            "authorRole": author_jobtitle,
            "time": post_time,
            "content": post_content or "",
            "reactions": post_reactions,
            "comments": post_comments,
            "image": post_image,
            "dateCollected": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        print(f"[+] Scraped Post {post_id} | Reactions: {post_reactions} | Comments: {post_comments}")
        scraped_posts.append(post_entry)
        
    browser.quit()
    
    if scraped_posts:
        output_json_file = "lib/scraped-news.json"
        with open(output_json_file, 'w', encoding='utf-8') as f:
            json.dump(scraped_posts, f, indent=2, ensure_ascii=False)
        print(f"\n[+] Success! Scraped {len(scraped_posts)} posts and saved to {output_json_file}")
    else:
        print("\n[!] No posts scraped.")

if __name__ == "__main__":
    main()

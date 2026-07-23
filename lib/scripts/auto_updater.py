#!/usr/bin/env python3
import os
import shutil
import time
import subprocess

def main():
    downloads_path = os.path.expanduser("~/Downloads/scraped-news.json")
    target_path = os.path.abspath("lib/scraped-news.json")
    
    print("[*] Monitoring your ~/Downloads folder for 'scraped-news.json'...")
    print("[*] Please paste and run the JavaScript code in your browser console now.")
    
    # Wait for the file to appear in Downloads
    found = False
    for _ in range(1200): # Wait up to 20 minutes
        if os.path.exists(downloads_path):
            found = True
            print(f"[+] Found downloaded news file at {downloads_path}!")
            break
        time.sleep(1)
        
    if not found:
        print("[!] Timeout: No scraped-news.json file detected in Downloads folder.")
        return
        
    # Copy the file to lib/scraped-news.json
    try:
        shutil.move(downloads_path, target_path)
        print(f"[+] Moved news feed file to {target_path}")
    except Exception as e:
        print(f"[!] Error moving file: {e}")
        return
        
    # Run the build
    print("[*] Running production build...")
    build_process = subprocess.run(["npm", "run", "build"], capture_output=True, text=True)
    if build_process.returncode != 0:
        print("[!] Build failed:")
        print(build_process.stderr)
        return
    print("[+] Production build completed successfully!")
    
    # Git add, commit, and push
    print("[*] Pushing updates to GitHub...")
    subprocess.run(["git", "add", "lib/scraped-news.json"])
    subprocess.run(["git", "commit", "-m", "feat: update news feed with real LinkedIn posts"])
    push_process = subprocess.run(["git", "push"], capture_output=True, text=True)
    
    if push_process.returncode == 0:
        print("\n" + "="*60)
        print("[+] SUCCESS! Your real LinkedIn posts are now live on your site!")
        print("="*60 + "\n")
    else:
        print("[!] Git push failed:")
        print(push_process.stderr)

if __name__ == "__main__":
    main()

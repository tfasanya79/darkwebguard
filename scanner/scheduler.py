from apscheduler.schedulers.background import BackgroundScheduler
import time
import subprocess

def run_crawlers():
    print("[Scheduler] Running crawlers...")
    subprocess.run(['python3', 'scanner/forum_crawlers/breached_db.py'])
    subprocess.run(['python3', 'scanner/forum_crawlers/darkreddit_scraper.py'])
    subprocess.run(['python3', 'scanner/forum_crawlers/onion_forum.py'])
    # Add more crawlers here as needed

if __name__ == "__main__":
    scheduler = BackgroundScheduler()
    scheduler.add_job(run_crawlers, 'interval', minutes=10)
    scheduler.start()
    print("[Scheduler] Started. Crawlers will run every 10 minutes.")
    try:
        while True:
            time.sleep(60)
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()
        print("[Scheduler] Stopped.")

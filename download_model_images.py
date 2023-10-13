import docker

def download_latest_images():
    client = docker.from_env()
    images = [
        'mcr.microsoft.com/presidio-analyzer:latest',
        'mcr.microsoft.com/presidio-anonymizer:latest'
    ]
    
    for image in images:
        print(f"Pulling {image}...")
        client.images.pull(image)

if __name__ == "__main__":
    download_latest_images()

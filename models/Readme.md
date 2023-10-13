* Setup Python virtual env
   python -m venv venv-dev

* Install depedencies:
   pip install -r ./requirements.txt
   
* Downlaod docker images:
   python download_model_images.py

* Deploy the service:
   python deploy_presidio.py 
 

* Verify Deployments:
     kubectl get deployments
     kubectl get pods

* Verify service:
    kubectl get services

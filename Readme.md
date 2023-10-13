* Downlaod docker images:
   python download_model_images.py

* Deploy the service:
   kubectl apply -f presidio-analyzer-deployment.yaml
   kubectl apply -f presidio-anonymizer-deployment.yaml
 

* Verify Deployments:
     kubectl get deployments
     kubectl get pods

* Expose the service:
     kubectl apply -f presidio-analyzer-service.yaml
     kubectl apply -f presidio-anonymizer-service.yaml

* Verify service:
    kubectl get services

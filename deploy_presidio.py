import os

def main():
    # Deploy the application
    os.system('kubectl apply -f presidio-analyzer-deployment.yaml')
    os.system('kubectl apply -f presidio-analyzer-service.yaml')

    print("\nDeployment and service have been created.\n")

    # Fetch the NodePort to access the service
    os.system('kubectl get svc presidio-analyzer-service')

    os.system('kubectl apply -f presidio-anonymizer-deployment.yaml')
    os.system('kubectl apply -f presidio-anonymizer-service.yaml')

    print("\nAnonymizer Deployment and service have been created.\n")

    # Fetch the NodePort to access the service
    os.system('kubectl get svc presidio-anonymizer-service')

if __name__ == "__main__":
    main()

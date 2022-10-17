# k6-demo

## Hosts
- localhost:7150
- k6-demo-api.azurewebsites.net

## URLs
- https://localhost:7150/weatherforecast
- https://localhost:7150/swagger
- https://localhost:7150/protectedforecast
- https://k6-demo-api.azurewebsites.net/weatherforecast
- https://k6-demo-api.azurewebsites.net/swagger
- https://k6-demo-api.azurewebsites.net/protectedforecast

## Installing K6
```
winget install k6
```

## Running K6 scripts
```
k6 run load_test1.js
k6 run --vus 10 --duration 30s load_test_1.js
```

## Publish API to Azure App Service
```
dotnet publish -c Debug -o ./bin/Publish
Compress-Archive -Path * -DestinationPath weatherforecast.zip
az account set --subscription "Visual Studio Professional"
az webapp deploy --resource-group k6-demo-rg --name k6-demo-api --src-path .\weatherforecast.zip
```
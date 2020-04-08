
1. Get it on DockerHub:
https://hub.docker.com/repository/docker/kbarhanin/stockswatch

2. Create directory to host your stocks data.

3. Run:
docker run --name stockswatch -v <your_stocks_data_directory_path>/stocks_data:/app/stocks/stocks_data -d -p 3100:3100 stockswatch:latest

![alt text](https://user-images.githubusercontent.com/34001701/77069152-91f45d80-69f0-11ea-8cba-5abeabd33584.png)

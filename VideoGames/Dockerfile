FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copy everything
COPY . .
RUN dotnet restore VideoGames.csproj
RUN dotnet publish VideoGames.csproj -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app ./
EXPOSE 5127
ENV ASPNETCORE_URLS=http://0.0.0.0:5127
ENV ASPNETCORE_ENVIRONMENT=Development
ENTRYPOINT ["dotnet", "VideoGames.dll"]
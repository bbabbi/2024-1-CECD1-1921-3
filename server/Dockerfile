FROM amd64/amazoncorretto:17
WORKDIR /app
COPY ./build/libs/docker-1.0.0-SNAPSHOT.jar /app/CECD-1921.jar
CMD ["java", "-Duser.timezone=Asia/Seoul", "-jar", "-Dspring.profiles.active=dev", "CEcD-1921.jar"]
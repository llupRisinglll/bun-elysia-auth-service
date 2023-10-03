FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
	curl \
	unzip

RUN curl -fsSL https://bun.sh/install | bash -s "bun-v1.0.0"

WORKDIR /app

COPY . /app

ENV PATH="/root/.bun/bin:${PATH}"

RUN /root/.bun/bin/bun install

EXPOSE 4000

ENTRYPOINT ["/bin/bash", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then bun start; else bun dev; fi"]
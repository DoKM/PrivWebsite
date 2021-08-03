FROM ubuntu:20.04

COPY ./deno /bin/deno
RUN chmod 755 /bin/deno

RUN addgroup --gid 1993 deno
RUN adduser --uid 1993 --gid 1993 deno
RUN mkdir /deno-dir/
RUN chown deno:deno /deno-dir/

ENV DENO_DIR /deno-dir/
ENV DENO_INSTALL_ROOT /usr/local

ENTRYPOINT ["/bin/deno"]

# The port that your application listens to.
EXPOSE 8080

WORKDIR /app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
#COPY deps.ts .
#RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache ./src/app.ts

CMD ["run", "--allow-net", "--allow-read", "./src/app.ts"]
-----
id: create-self-signed-tls-cert
title: "Create a self-signed TLS certificate"
subtitle: "And also a new certificate key"
content-type: spell 
-----

This is all you need to create a self-signed X509 certificates that lasts for 365 days, and a 2048-bit-long certificate key:

```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
```

This will ask you a few questions which should be self-explanatory. When asked about the FQDN, you can use the IP address of the server.

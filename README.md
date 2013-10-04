#MessageBoard
A Sample message board application developed for the [USCLUG](http://usclug.deterlab.net/) event on Oct 03, 2013.

###Installing  Node.js on EC2
This guide will walk you through install Node.js on an Amazon EC2 instance using the 'Amazon Linux Basic 32-bit/64-bit' image.

####Install Required Packages
We need to install:
  + git
  + GCC C++ compiler
  + The make tool  

```bash
sudo yum install -y git
sudo yum install -y gcc-c++
sudo yum install -y make
```

####Install Node.js
First, we download the sources for Node.js
```bash
wget http://nodejs.org/dist/node-latest.tar.gz
tar -zxvf node-latest.tar.gz
rm -rf node-latest.tar.gz
```

Now, we configure, compile and install it
```bash
#Change diretory
cd node-v*

#Generate configuration
./configure --prefix=/usr

#Compile and install
make
sudo make install
```


###Install MongoDB

```
echo "[MongoDB]
name=MongoDB Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64
gpgcheck=0
enabled=1" | sudo tee -a /etc/yum.repos.d/mongodb.repo

sudo yum install -y mongo-10gen-server
```

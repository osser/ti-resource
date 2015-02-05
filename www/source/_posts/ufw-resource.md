title: ufwコマンド
date: 2015-02-05 16:07:20
tags:
---

#### Ubuntu-UFW

sudo ufw allow from 192.168.1.0/24
sudo ufw allow from 192.168.1.10
sudo ufw allow from 192.168.1.20 to any port ssh
sudo ufw allow from 192.168.1.0/24 to any app Samba
sudo ufw allow from 192.168.1.10 to any port ssh
sudo ufw limit ssh
sudo ufw delete limit ssh
sudo ufw status numbered
sudo ufw delete limit from 192.168.1.20 to any port ssh
sudo ufw insert 1 limit from 192.168.1.20 to any port ssh


sudo ufw enable
sudo ufw status verbose
sudo ufw show raw
sudo ufw disable
sudo ufw allow 53
sudo ufw allow 53/tcp
sudo ufw allow 53/udp
sudo ufw deny 53
sudo ufw deny 53/tcp
sudo ufw deny 53/udp
sudo ufw deny 80/tcp
sudo ufw delete deny 80/tcp
sudo ufw allow ssh
sudo ufw deny ssh
sudo ufw logging on
sudo ufw logging off
sudo ufw allow from 192.168.1.1
sudo ufw allow from 192.168.1.0/24
sudo ufw allow from 192.168.0.4 to any port 22
sudo ufw allow from 192.168.0.4 to any port 22 proto tcp
sudo ufw deny from 192.168.1.1
sudo ufw deny from 192.168.1.1 to any port 22
sudo ufw status numbered
sudo ufw delete 1
sudo ufw deny from 192.168.0.1 to any port 22
sudo ufw allow from 192.168.0.0/24 to any port 22 proto tcp


#!/usr/bin/env bash

sudo -iu postgres createuser utilisateur
sudo -iu postgres createdb restorantx
sudo -iu postgres psql -c "alter user utilisateur with encrypted password 'unMotDePasseComplex';"
sudo -iu postgres psql -c "grant all privileges on database restorantx to utilisateur;"
#!/bin/sh
# ansible-playbook -i inventory.ini playbook.yml --ask-pass # Demande le mdp si pas de ssh clé pub

# OK
ansible-playbook -i inventory.ini playbook.yml --ask-become-pass # Demande mot de passe root pour passer sudo
#ansible all -i inventory.ini -m ping


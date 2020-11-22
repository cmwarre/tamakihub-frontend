#!/usr/bin/env python
from fabric.api import env,run,local,get,put,task,sudo

env.user='cwarren'
env.hosts=[
    '104.156.229.99'
]

project = "tamaki-hub-frontend"


def publish():
    local("tar -czvf publish/%s.tar.gz public/* index.html" % project)
    put("publish/%s.tar.gz" % project)
    sudo("tar -zxvf %s.tar.gz -C /var/www/html/" % (project))
    sudo("service nginx reload")
# end def
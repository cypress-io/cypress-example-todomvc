#!/usr/bin/env bash
curl --user ${CIRCLE_TOKEN}: \
    --request POST \
    --form revision=fa9a47a24ccf26d4329a8e0e2b06cbd765a1a1f2\
    --form config=@config.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/alffrey/cypress-example-todomvc/tree/master
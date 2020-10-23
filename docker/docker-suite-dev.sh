#!/usr/bin/env bash

# script that spins up local dev environment for trezor-suite

set -e -o pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"
source _config.sh

goodbye() {
  ./docker-compose down
  echo "bye bye"
}

trap goodbye EXIT

./docker-compose up --build --remove-orphans

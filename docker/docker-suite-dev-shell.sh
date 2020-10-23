#!/usr/bin/env bash

# script that spins up local dev environment for trezor-suite

set -e -o pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"
source _config.sh

set -x
exec ./docker-compose exec suite-dev "${TREZOR_SUITE_PREFERRED_SHELL}"

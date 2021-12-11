# YAML Config Lint

Lint multiline json config in yaml files

## Installation

```bash
npm i -g yaml-config-lint
```

## Usage

```bash
Lint multiline data inside YAML files

USAGE
  $ ycl

OPTIONS
  -f, --files=files  (required) Input File(s)
  -h, --help         show CLI help
  -k, --keys=keys    (required) Keys you want to validate
  -v, --version      show CLI version
```

- `-f` can be a file name or a glob pattern
- `-k` is the key in the yaml data whose content you want to lint, nested keys can be selected by using `.`

For Example

```yaml
// pokemon.yaml

apiVersion: v1
kind: ConfigMap
metadata:
  name: game-demo
data:
  pokemon: |
    {
      "ability": {
        "name": "imposter",
        "url": "https://pokeapi.co/api/v2/ability/150/"
      },
      "is_hidden": true,
      "slot": 3
    }   
```

```sh
$ ycl -k data.pokemon -f pokemon.yaml
Running YAML Config Lint:

✅ jsonlint successful: pokemon.yaml
```

In case of incorrect JSON like this

```yaml
// pokemon.yaml

apiVersion: v1
kind: ConfigMap
metadata:
  name: game-demo
data:
  pokemon: |
    {
      "ability"
        "name": "imposter",
        "url": "https://pokeapi.co/api/v2/ability/150/"
      },
      "is_hidden": true,
      "slot": 3
    }   
```

```sh
$ ycl -k data.pokemon pokemon.yaml
Running YAML Config Lint:

jsonlint error in: pokemon.yaml
Parse error on line 2:
{  "ability"    "name": "imposter",
----------------^
Expecting 'EOF', '}', ':', ',', ']', got 'STRING'

```
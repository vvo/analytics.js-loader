# 2.1.1 (2016-01-01)

* use https: protocol by default
  - segment script is loaded from a secure request if current protocol is not http: (for chrome-extension: for example)

# 2.1.0 (2015-10-27)

* add reset method

# 2.0.0 (2015-10-06)

  * fix loader to not pollute global scope
    - the function returns the analytics object now instead of messing with globals

# 1.1.0 (2015-04-24)

  * add skipPageCall param

# 1.0.1 (2015-02-10)

  * fix snippet integration, do no try to be smart

# 1.0.0 (2015-01-29)

  * initial

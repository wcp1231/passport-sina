MOCHA ?= ./node_modules/.bin/mocha
MOCHA_REPORTER ?= spec
MOCHA_REQUIRE ?= ./test/bootstrap/node
TESTS ?= test/*.test.js

test:
	$(MOCHA) \
		--reporter $(MOCHA_REPORTER) \
		--require $(MOCHA_REQUIRE) \
		$(TEST)

.PHONY: test

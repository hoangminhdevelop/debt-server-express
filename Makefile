.PHONY: infra-up build-image push-image

build-image:
	docker buildx build --platform linux/arm64/v3,linux/arm64/v8,linux/amd64 -t minhtruonghoang/rebt-server:$(v) --push . --no-cache

pi: 
	docker push minhtruonghoang/rebt-server:$(v)



current_dir := $(shell pwd)
user := $(shell whoami)

image_name := registry.gitlab.com/debona-transportes/webclient


build:		
ifndef v
	$(error variável de versão (v) não definida)
endif		
	make build-ng
	make build-docker v=$(v)
	make publish-docker v=$(v)

build-ng:		
	npm run publish	

build-docker:		
ifndef v
	$(error variável de versão (v) não definida)
endif				
	docker build -f docker/prod.Dockerfile -t $(image_name):$(v) .

publish-docker:		
ifndef v
	$(error variável de versão (v) não definida)
endif		
	docker logout	
	docker login registry.gitlab.com -u amp-packge-docker -p S4ALuzDr1oxxBkQi6Qf_
	docker push $(image_name):$(v)
	docker tag $(image_name):$(v) $(image_name):latest
	docker push $(image_name):latest


docker-run:
	docker run -ti -p 8080:80 --rm $(image_name):$(v)

run:
	npm run serve


	
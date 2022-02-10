all:
	echo 'run "make web" to build web app & run "make mobile" to build mobile app'

web:
	cp -r ./global-src/* area-front-web/src/

mobile:
	cp -r ./global-src/* AreaFrontMobile/src/

fclean:
	rm -rf ./area-front-web/src/reducers/
	rm -rf ./AreaFrontMobile/src/reducers/
	rm -rf ./area-front-web/src/actions/
	rm -rf ./AreaFrontMobile/src/actions/
	rm -rf ./area-front-web/src/containers/
	rm -rf ./AreaFrontMobile/src/containers/
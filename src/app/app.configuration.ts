import { EndpointsService } from "./core/services/endpoints/endpoints.service";

export function AuthenticationConfigurationFactory(endpointsProvider: EndpointsService) {
    return {
        authorityEndpointGetter: () => {
            return endpointsProvider.getLoginUrl();
        },
        onForbidden: () => {
            console.log('forbidden');
        },
        clientId: '',
        scope: '',
        userNameKeyName: 'userName',
        tokenKeyName: 'token'
    };
}

import { ModuleWithProviders, OpaqueToken } from '@angular/core';
import { ConfigInterface } from './models';
import { ClientConfigService } from './services';
export declare const CONFIG_DATA: OpaqueToken;
export declare function configHelperFactory(config: ConfigInterface): typeof ClientConfigService;
export declare class CdfMediaModule {
    static forRoot(config: ConfigInterface): ModuleWithProviders;
}

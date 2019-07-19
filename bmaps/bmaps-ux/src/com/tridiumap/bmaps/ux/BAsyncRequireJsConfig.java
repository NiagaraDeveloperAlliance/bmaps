package com.tridiumap.bmaps.ux;

import javax.baja.naming.BOrd;
import javax.baja.nre.annotations.NiagaraSingleton;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.sys.BSingleton;
import javax.baja.sys.Context;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;
import javax.baja.web.js.BIRequireJsConfig;
import javax.baja.web.js.JsInfo;

/**
 * Used to configure <a href="https://github.com/millermedeiros/requirejs-plugins">async</a>
 * in RequireJS.
 */
@NiagaraType
@NiagaraSingleton
public class BAsyncRequireJsConfig extends BSingleton
  implements BIRequireJsConfig
{
  /*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
  /*@ $com.tridiumap.bmaps.ux.BAsyncRequireJsConfig(3933907701)1.0$ @*/
  /* Generated Thu Jun 27 13:49:01 CST 2019 by Slot-o-Matic (c) Tridium, Inc. 2012 */
  @SuppressWarnings("unused")
  public static final BAsyncRequireJsConfig INSTANCE = new BAsyncRequireJsConfig();

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////

  @Override
  public Type getType() { return TYPE; }

  public static final Type TYPE = Sys.loadType(BAsyncRequireJsConfig.class);

  /*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/

  @Override
  public JsInfo getJsInfo(Context context) {
    return JS_INFO;
  }

  private static final JsInfo JS_INFO = JsInfo.make(
    BOrd.make("module://bmaps/rc/asyncRequireJsConfig.js"));
}

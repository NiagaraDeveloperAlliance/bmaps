package com.tridiumap.bmaps.ux;

import javax.baja.naming.BOrd;
import javax.baja.nre.annotations.NiagaraSingleton;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.sys.BSingleton;
import javax.baja.sys.Context;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;
import javax.baja.web.BIFormFactorMax;
import javax.baja.web.js.BIJavaScript;
import javax.baja.web.js.JsInfo;

/**
 * Displays a Baidu map in a Widget. The associated binding will make a NEQL query to the
 * Station for Components that have the 'geoCoord' tag from the Niagara dictionary.
 * <p>
 * This widget is intended to be used on a Px page.
 * </p>
 * <ul>
 * <li>Each Component found will render a point on the Map.</li>
 * <li>If the Component implements 'BIStatus' and it's in alarm, the point will flash red and yellow.</li>
 * <li>Clicking a point will pop up an info window. The window contains a link to the Component as well
 * as a table of live data. The table renders property values from the Component that have the
 * {@link javax.baja.sys.Flags#SUMMARY} slot flag.</li>
 * </ul>
 */
@NiagaraType
@NiagaraSingleton
public final class BBMapsWidget extends BSingleton
  implements BIJavaScript, BIFormFactorMax
{
  /*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
  /*@ $com.tridiumap.bmaps.ux.BBMapsWidget(3933907701)1.0$ @*/
  /* Generated Thu Jun 27 13:33:19 CST 2019 by Slot-o-Matic (c) Tridium, Inc. 2012 */
  @SuppressWarnings("unused")
  public static final BBMapsWidget INSTANCE = new BBMapsWidget();

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////

  @Override
  public Type getType() { return TYPE; }

  public static final Type TYPE = Sys.loadType(BBMapsWidget.class);

  /*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/

  @Override
  public JsInfo getJsInfo(Context context) {
    return JS_INFO;
  }

  private static final JsInfo JS_INFO =
    JsInfo.make(BOrd.make("module://bmaps/rc/BMapsWidget.js")
      , BBMapsWidgetBuild.TYPE
    );
}

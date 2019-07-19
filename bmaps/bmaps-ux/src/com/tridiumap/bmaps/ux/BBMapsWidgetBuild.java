package com.tridiumap.bmaps.ux;

import javax.baja.naming.BOrd;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;
import javax.baja.web.js.BJsBuild;

/**
 * JavaScript Build for the Widget.
 */
@NiagaraType
public final class BBMapsWidgetBuild extends BJsBuild
{
  @SuppressWarnings("unused")
  public static final BBMapsWidgetBuild INSTANCE = new BBMapsWidgetBuild(
    "bmaps",
    new BOrd[]{BOrd.make("module://bmaps/rc/bmaps.built.min.js")}
    // If a new Type[] is needed here, enable the 3-argument constructor
  );

  /*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
  /*@ $com.tridiumap.bmaps.ux.BBMapsWidgetBuild(2979906276)1.0$ @*/
  /* Generated Thu Jun 27 13:47:00 CST 2019 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////

  @Override
  public Type getType() { return TYPE; }

  public static final Type TYPE = Sys.loadType(BBMapsWidgetBuild.class);

  /*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/

  private BBMapsWidgetBuild(String id, BOrd[] files) {
    super(id, files);
  }
}

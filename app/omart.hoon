::  omart: omarchy plugin bazaar, gossiped among pals
::
/-  *omart
/+  gossip, default-agent, dbug
::
/$  grab-plugin  %noun  %omart-plugin
::
|%
+$  state-0
  $:  %0
      listings=(map id plugin)
      retracted=(set id)
  ==
+$  card  card:agent:gall
--
::
=|  state-0
=*  state  -
::
%-  %+  agent:gossip
      [2 %anybody %anybody &]
    %+  ~(put by *(map mark $-(* vase)))
      %omart-plugin
    |=(n=* !>((grab-plugin n)))
::
%-  agent:dbug
^-  agent:gall
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %|) bowl)
::
++  on-init
  ^-  (quip card _this)
  :_  this
  [%pass /eyre/connect %arvo %e %connect [~ /[dap.bowl]] dap.bowl]~
::
++  on-save  !>(state)
++  on-load
  |=  ole=vase
  ^-  (quip card _this)
  `this(state !<(state-0 ole))
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark  (on-poke:def mark vase)
      %omart-action
    ?>  =(src our):bowl
    =+  act=!<(action vase)
    ?-    -.act
        %publish
      =/  =plugin  plugin.act
      =.  ship.plugin  our.bowl
      =.  when.plugin  now.bowl
      :-  [(invent:gossip %omart-plugin !>(plugin))]~
      this(listings (~(put by listings) id.plugin plugin))
    ::
        %retract
      `this(listings (~(del by listings) id.act), retracted (~(put in retracted) id.act))
    ==
  ==
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?:  ?=([%http-response *] path)  [~ this]
  ?:  &(=(/listings path) =(our src):bowl)  [~ this]
  ?.  =(/~/gossip/source path)
    (on-watch:def path)
  :_  this
  %+  turn  ~(val by listings)
  |=  =plugin
  [%give %fact ~ %omart-plugin !>(plugin)]
::
++  on-arvo   on-arvo:def
++  on-leave  on-leave:def
++  on-fail   on-fail:def
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?.  ?=([%~.~ %gossip *] wire)
    (on-agent:def wire sign)
  ?+    -.sign  (on-agent:def wire sign)
      %fact
    ?+    p.cage.sign  (on-agent:def wire sign)
        %omart-plugin
      =+  plug=!<(plugin q.cage.sign)
      ?:  (~(has in retracted) id.plug)  [~ this]
      :-  [%give %fact [/listings]~ %omart-plugin !>(plug)]~
      this(listings (~(put by listings) id.plug plug))
    ==
  ==
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+  path  (on-peek:def path)
    [%x %listings ~]  ``noun+!>(~(val by listings))
    [%x %plugin @ ~]
      =/  =id  i.t.t.path
      ``noun+!>(`(unit plugin)`(~(get by listings) id))
  ==
--

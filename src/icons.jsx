/**
 * TH79 iMOVE - Material Symbols Rounded icon adapter.
 * Keeps familiar component APIs so pages can be upgraded without broken imports.
 * Uses the project's existing lucide-react icons only as a robust offline fallback.
 */
import React from 'react';
import * as FallbackIcons from 'lucide-react';

const glyphs = {
  ArrowRight:'arrow_forward', ArrowUpRight:'north_east', BadgeCheck:'verified',
  BellRing:'notifications_active', Bike:'two_wheeler', Box:'inventory_2',
  CalendarCheck:'event_available', CarFront:'directions_car', Check:'check',
  CheckCircle2:'check_circle', ChevronDown:'keyboard_arrow_down',
  CircleHelp:'help', Clock3:'schedule', Copy:'content_copy',
  CreditCard:'credit_card', Gift:'redeem', Globe2:'public',
  Headphones:'support_agent', Heart:'favorite', LocateFixed:'my_location',
  Map:'map', MapPin:'location_on', Menu:'menu', Minus:'remove',
  MousePointerClick:'touch_app', Navigation2:'near_me', Package:'package_2',
  Play:'play_arrow', Plus:'add', RouteIcon:'route', ShieldCheck:'verified_user',
  ShoppingBag:'shopping_bag', Smartphone:'smartphone', Sparkles:'auto_awesome',
  Store:'storefront', ThumbsUp:'thumb_up', Truck:'local_shipping',
  UtensilsCrossed:'restaurant', Wallet:'account_balance_wallet', X:'close',
  ScanQrCode:'qr_code_scanner', Send:'send', MoveRight:'trending_flat',
  Search:'search', Languages:'translate', Newspaper:'article',
  BookOpen:'menu_book', UserRoundPlus:'person_add', Info:'info',
  ChevronRight:'chevron_right', LifeBuoy:'support',
  ExternalLink:'open_in_new', FileText:'description', Home:'home', Grid2X2:'grid_view',
  // Non-branded navigation icons are now all rounded Material Symbols.
};

if (typeof document !== 'undefined' && document.fonts?.load) {
  document.fonts.load('500 24px "Material Symbols Rounded"')
    .then((fonts) => {
      if (fonts?.length) document.documentElement.classList.add('imove-material-icons-ready');
    }).catch(() => {});
}

const makeIcon = (name) => {
  const Fallback = FallbackIcons[name === 'RouteIcon' ? 'Route' : name] || FallbackIcons.CircleHelp;
  const glyph = glyphs[name];
  const Icon = ({size=24, color, strokeWidth=1.9, fill, className='', style, title, ...props}) => {
    // Social platforms have brand artwork; keep their proper recognizable shape.
    if (name === 'Facebook' || name === 'Music2' || !glyph) {
      return <Fallback size={size} color={color} strokeWidth={strokeWidth} fill={fill ?? 'none'} className={className} style={style} aria-label={title} {...props}/>;
    }
    const numericSize=typeof size==='number' ? `${size}px` : size;
    return <span className={`imove-rounded-icon ${className}`} style={{width:numericSize,height:numericSize,color,...style}} aria-hidden="true" title={title} {...props}>
      <span className="imove-rounded-icon-glyph material-symbols-rounded" style={{fontSize:numericSize}}>{glyph}</span>
      <Fallback className="imove-rounded-icon-fallback" size={size} strokeWidth={strokeWidth} fill={fill??'none'}/>
    </span>;
  };
  Icon.displayName = `iMove${name}`;
  return Icon;
};

export const ArrowRight=makeIcon('ArrowRight'), ArrowUpRight=makeIcon('ArrowUpRight'),
 BadgeCheck=makeIcon('BadgeCheck'), BellRing=makeIcon('BellRing'), Bike=makeIcon('Bike'), Box=makeIcon('Box'),
 CalendarCheck=makeIcon('CalendarCheck'), CarFront=makeIcon('CarFront'), Check=makeIcon('Check'),
 CheckCircle2=makeIcon('CheckCircle2'), ChevronDown=makeIcon('ChevronDown'), CircleHelp=makeIcon('CircleHelp'),
 Clock3=makeIcon('Clock3'), Copy=makeIcon('Copy'), CreditCard=makeIcon('CreditCard'), Gift=makeIcon('Gift'),
 Globe2=makeIcon('Globe2'), Headphones=makeIcon('Headphones'), Heart=makeIcon('Heart'),
 LocateFixed=makeIcon('LocateFixed'), Map=makeIcon('Map'), MapPin=makeIcon('MapPin'), Menu=makeIcon('Menu'),
 Minus=makeIcon('Minus'), MousePointerClick=makeIcon('MousePointerClick'), Navigation2=makeIcon('Navigation2'),
 Package=makeIcon('Package'), Play=makeIcon('Play'), Plus=makeIcon('Plus'),
 RouteIcon=makeIcon('RouteIcon'), ShieldCheck=makeIcon('ShieldCheck'), ShoppingBag=makeIcon('ShoppingBag'),
 Smartphone=makeIcon('Smartphone'), Sparkles=makeIcon('Sparkles'), Store=makeIcon('Store'),
 ThumbsUp=makeIcon('ThumbsUp'), Truck=makeIcon('Truck'), UtensilsCrossed=makeIcon('UtensilsCrossed'),
 Wallet=makeIcon('Wallet'), X=makeIcon('X'), Facebook=makeIcon('Facebook'), Music2=makeIcon('Music2'),
 ScanQrCode=makeIcon('ScanQrCode'), Send=makeIcon('Send'), MoveRight=makeIcon('MoveRight'),
 Search=makeIcon('Search'), Languages=makeIcon('Languages'), Newspaper=makeIcon('Newspaper'),
 BookOpen=makeIcon('BookOpen'), UserRoundPlus=makeIcon('UserRoundPlus'), Info=makeIcon('Info'),
 ChevronRight=makeIcon('ChevronRight'), LifeBuoy=makeIcon('LifeBuoy'), ExternalLink=makeIcon('ExternalLink'),
 FileText=makeIcon('FileText'), Home=makeIcon('Home'), Grid2X2=makeIcon('Grid2X2');

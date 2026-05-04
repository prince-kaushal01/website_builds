<<<<<<< HEAD
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
=======
import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
>>>>>>> ea7da798edf3d3cb686e75555a161e7004368459
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'motion/react';
import { X, ArrowLeft, ArrowRight, Maximize2, Play } from 'lucide-react';

/* ─── types ─── */
type Size = 'sm' | 'md' | 'lg' | 'wide' | 'tall' | 'feature';
interface Item {
  id: string;
  category: string;
  title: string;
  sub: string;
  img: string;
  size: Size;
  youtubeId?: string;
}

/* ─── data ─── */
const categories = [
<<<<<<< HEAD
  { id: 'all', label: 'All Work', count: 95 },
  { id: 'weddings', label: 'Weddings', count: 73 },
=======
  { id: 'all', label: 'All Work', count: 69 },
  { id: 'weddings', label: 'Weddings', count: 44 },
>>>>>>> ea7da798edf3d3cb686e75555a161e7004368459
  { id: 'resort', label: 'Resort / Hotel', count: 5 },
  { id: 'commercial', label: 'Commercial Ads', count: 5 },
  { id: 'realestate', label: 'Real Estate', count: 4 },
  { id: 'food', label: 'Food Photography', count: 4 },
  { id: 'drone', label: 'Drone Cinematics', count: 5 },
  { id: 'editing', label: 'Editing Work', count: 2 },
];

const items: Item[] = [
  // Weddings
<<<<<<< HEAD
  { id: 'w1', category: 'weddings', title: 'Priya & Aryan', sub: 'Mumbai Palace', img: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', size: 'feature' },
  { id: 'w2', category: 'weddings', title: 'Sarah & James', sub: 'Santorini, Greece', img: 'https://images.unsplash.com/photo-1519741196428-6a2175fa2557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900', size: 'tall' },
  { id: 'w3', category: 'weddings', title: 'Meera & Raj', sub: 'Jaipur Heritage', img: 'https://images.unsplash.com/photo-1686294588684-9607a670181c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900', size: 'wide' },
  { id: 'w4', category: 'weddings', title: 'Ananya & Vikram', sub: 'Delhi Ceremony', img: 'https://images.unsplash.com/photo-1573676048035-9c2a72b6a12a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', size: 'md' },
  { id: 'w5', category: 'weddings', title: 'Emma & Lucas', sub: 'Paris, France', img: 'https://images.unsplash.com/flagged/photo-1552981941-424aac2b4311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', size: 'md' },
  { id: 'w6', category: 'weddings', title: 'Kavya & Rohan', sub: 'Goa Beachside', img: 'https://images.unsplash.com/photo-1617724975854-70b5d0cedb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900', size: 'wide' },
  { id: 'w7', category: 'weddings', title: 'Dia & Karan', sub: 'Udaipur Lake', img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', size: 'sm' },
  { id: 'w8', category: 'weddings', title: 'Rings & Roses', sub: 'Detail shoot', img: 'https://images.unsplash.com/photo-1533091090875-1ff4acc497dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', size: 'sm' },
  { id: 'wa1', category: 'weddings', title: 'Bridal Portrait', sub: 'Indian Wedding', img: '/images/DSC08322.JPG', size: 'md' },
  { id: 'wa2', category: 'weddings', title: 'Sacred Vows', sub: 'Wedding Photography', img: '/images/08.jpg', size: 'md' },
  { id: 'wa3', category: 'weddings', title: 'Ceremony Moments', sub: 'Madworks Studio', img: '/images/Copy%20of%2007.jpg', size: 'wide' },
  { id: 'wa4', category: 'weddings', title: 'Wedding Details', sub: 'Destination Wedding', img: '/images/Copy%20of%20DSC00698.JPG', size: 'md' },
  { id: 'wa5', category: 'weddings', title: 'Couple Session', sub: 'Royal Ceremony', img: '/images/VOV01537.jpg', size: 'tall' },
  { id: 'wa6', category: 'weddings', title: 'Reception', sub: 'Traditional Ceremony', img: '/images/VOW01559.jpg', size: 'md' },
  { id: 'wa7', category: 'weddings', title: 'Mandap Decor', sub: 'Candid Portraits', img: '/images/DSC06241.jpg', size: 'md' },
  { id: 'wa8', category: 'weddings', title: 'Bridal Prep', sub: 'Timeless Moments', img: '/images/Copy%20of%2006.jpg', size: 'wide' },
  { id: 'wa9', category: 'weddings', title: 'Family Portrait', sub: 'Indian Wedding', img: '/images/Copy%20of%20DSC07192.JPG', size: 'md' },
  { id: 'wa10', category: 'weddings', title: 'Ring Ceremony', sub: 'Wedding Photography', img: '/images/DSC02683.JPG', size: 'tall' },
  { id: 'wa11', category: 'weddings', title: 'First Dance', sub: 'Madworks Studio', img: '/images/VOW01354.jpg', size: 'md' },
  { id: 'wa12', category: 'weddings', title: 'Candid Moments', sub: 'Destination Wedding', img: '/images/DSC06395.jpg', size: 'md' },
  { id: 'wa13', category: 'weddings', title: 'Baraat', sub: 'Royal Ceremony', img: '/images/Copy%20of%2030.jpg', size: 'wide' },
  { id: 'wa14', category: 'weddings', title: 'Vidai', sub: 'Traditional Ceremony', img: '/images/-37-.jpg', size: 'md' },
  { id: 'wa15', category: 'weddings', title: 'Pheras', sub: 'Candid Portraits', img: '/images/DSC02285.JPG', size: 'tall' },
  { id: 'wa16', category: 'weddings', title: 'Wedding Rituals', sub: 'Timeless Moments', img: '/images/DSC05343.jpg', size: 'md' },
  { id: 'wa17', category: 'weddings', title: 'Bridal Jewelry', sub: 'Indian Wedding', img: '/images/DSC00506.JPG', size: 'md' },
  { id: 'wa18', category: 'weddings', title: 'Mehndi Details', sub: 'Wedding Photography', img: '/images/Copy%20of%20VOW08296.jpg', size: 'wide' },
  { id: 'wa19', category: 'weddings', title: 'Golden Hour', sub: 'Madworks Studio', img: '/images/A_W03428.JPG', size: 'md' },
  { id: 'wa20', category: 'weddings', title: 'Love Story', sub: 'Destination Wedding', img: '/images/DSC09533.JPG', size: 'tall' },
  { id: 'wa21', category: 'weddings', title: 'Bridal Portrait', sub: 'Royal Ceremony', img: '/images/DSC08825.JPG', size: 'md' },
  { id: 'wa22', category: 'weddings', title: 'Sacred Vows', sub: 'Traditional Ceremony', img: '/images/Copy%20of%20DSC07602.JPG', size: 'md' },
  { id: 'wa23', category: 'weddings', title: 'Ceremony Moments', sub: 'Candid Portraits', img: '/images/VOW01254.jpg', size: 'wide' },
  { id: 'wa24', category: 'weddings', title: 'Wedding Details', sub: 'Timeless Moments', img: '/images/DSC08733.JPG', size: 'md' },
  { id: 'wa25', category: 'weddings', title: 'Couple Session', sub: 'Indian Wedding', img: '/images/VOV01532.jpg', size: 'tall' },
  { id: 'wa26', category: 'weddings', title: 'Reception', sub: 'Wedding Photography', img: '/images/Copy%20of%20DSC07158.JPG', size: 'md' },
  { id: 'wa27', category: 'weddings', title: 'Mandap Decor', sub: 'Madworks Studio', img: '/images/DSC06281.jpg', size: 'md' },
  { id: 'wa28', category: 'weddings', title: 'Bridal Prep', sub: 'Destination Wedding', img: '/images/DSC09193.JPG', size: 'wide' },
  { id: 'wa29', category: 'weddings', title: 'Family Portrait', sub: 'Royal Ceremony', img: '/images/Copy%20of%20VOW08429.jpg', size: 'md' },
  { id: 'wa30', category: 'weddings', title: 'Ring Ceremony', sub: 'Traditional Ceremony', img: '/images/DSC02064.JPG', size: 'tall' },
  { id: 'wa31', category: 'weddings', title: 'First Dance', sub: 'Candid Portraits', img: '/images/Copy%20of%20DSC06645.JPG', size: 'md' },
  { id: 'wa32', category: 'weddings', title: 'Candid Moments', sub: 'Timeless Moments', img: '/images/DSC02699.JPG', size: 'md' },
  { id: 'wa33', category: 'weddings', title: 'Baraat', sub: 'Indian Wedding', img: '/images/VOV01553.jpg', size: 'wide' },
  { id: 'wa34', category: 'weddings', title: 'Vidai', sub: 'Wedding Photography', img: '/images/DSC00903.jpg', size: 'md' },
  { id: 'wa35', category: 'weddings', title: 'Pheras', sub: 'Madworks Studio', img: '/images/DSC01230.jpg', size: 'tall' },
  { id: 'wa36', category: 'weddings', title: 'Wedding Rituals', sub: 'Destination Wedding', img: '/images/APP04505.jpg', size: 'md' },
  { id: 'wa37', category: 'weddings', title: 'Bridal Jewelry', sub: 'Royal Ceremony', img: '/images/DSC06253.jpg', size: 'md' },
  { id: 'wa38', category: 'weddings', title: 'Mehndi Details', sub: 'Traditional Ceremony', img: '/images/DSC00779.JPG', size: 'wide' },
  { id: 'wa39', category: 'weddings', title: 'Golden Hour', sub: 'Candid Portraits', img: '/images/DSC00651.jpg', size: 'md' },
  { id: 'wa40', category: 'weddings', title: 'Love Story', sub: 'Timeless Moments', img: '/images/DSC02770.JPG', size: 'tall' },
  { id: 'wa41', category: 'weddings', title: 'Bridal Portrait', sub: 'Indian Wedding', img: '/images/Copy%20of%2028.jpg', size: 'md' },
  { id: 'wa42', category: 'weddings', title: 'Sacred Vows', sub: 'Wedding Photography', img: '/images/DSC02310.JPG', size: 'md' },
  { id: 'wa43', category: 'weddings', title: 'Ceremony Moments', sub: 'Madworks Studio', img: '/images/DSC06297.jpg', size: 'wide' },
  { id: 'wa44', category: 'weddings', title: 'Wedding Details', sub: 'Destination Wedding', img: '/images/DSC00827.JPG', size: 'md' },
  { id: 'wa45', category: 'weddings', title: 'Couple Session', sub: 'Royal Ceremony', img: '/images/DSC08858.JPG', size: 'tall' },
  { id: 'wa46', category: 'weddings', title: 'Reception', sub: 'Traditional Ceremony', img: '/images/DSC01170.JPG', size: 'md' },
  { id: 'wa47', category: 'weddings', title: 'Mandap Decor', sub: 'Candid Portraits', img: '/images/DSC00612.JPG', size: 'md' },
  { id: 'wa48', category: 'weddings', title: 'Bridal Prep', sub: 'Timeless Moments', img: '/images/DSC00382.JPG', size: 'wide' },
  { id: 'wa49', category: 'weddings', title: 'Family Portrait', sub: 'Indian Wedding', img: '/images/DSC01959.JPG', size: 'md' },
  { id: 'wa50', category: 'weddings', title: 'Ring Ceremony', sub: 'Wedding Photography', img: '/images/DSC07239.jpg', size: 'tall' },
  { id: 'wa51', category: 'weddings', title: 'First Dance', sub: 'Madworks Studio', img: '/images/A_W03451.JPG', size: 'md' },
  { id: 'wa52', category: 'weddings', title: 'Candid Moments', sub: 'Destination Wedding', img: '/images/DSC05533.JPG', size: 'md' },
  { id: 'wa53', category: 'weddings', title: 'Baraat', sub: 'Royal Ceremony', img: '/images/A_W03418.JPG', size: 'wide' },
  { id: 'wa54', category: 'weddings', title: 'Vidai', sub: 'Traditional Ceremony', img: '/images/DAV08752.JPG', size: 'md' },
  { id: 'wa55', category: 'weddings', title: 'Pheras', sub: 'Candid Portraits', img: '/images/DSC09957.JPG', size: 'tall' },
  { id: 'wa56', category: 'weddings', title: 'Wedding Rituals', sub: 'Timeless Moments', img: '/images/DSC00802.JPG', size: 'md' },
  { id: 'wa57', category: 'weddings', title: 'Bridal Jewelry', sub: 'Indian Wedding', img: '/images/DSC01051.JPG', size: 'md' },
  { id: 'wa58', category: 'weddings', title: 'Mehndi Details', sub: 'Wedding Photography', img: '/images/DSC03323.JPG', size: 'wide' },
  { id: 'wa59', category: 'weddings', title: 'Golden Hour', sub: 'Madworks Studio', img: '/images/DSC08329.JPG', size: 'md' },
  { id: 'wa60', category: 'weddings', title: 'Love Story', sub: 'Destination Wedding', img: '/images/DSC02888.JPG', size: 'tall' },
  { id: 'wa61', category: 'weddings', title: 'Bridal Portrait', sub: 'Royal Ceremony', img: '/images/VOW01642.jpg', size: 'md' },
  { id: 'wa62', category: 'weddings', title: 'Sacred Vows', sub: 'Traditional Ceremony', img: '/images/DSC00845.JPG', size: 'md' },
  { id: 'wa63', category: 'weddings', title: 'Ceremony Moments', sub: 'Candid Portraits', img: '/images/Copy%20of%20VOW08456.jpg', size: 'wide' },
  { id: 'wa64', category: 'weddings', title: 'Wedding Details', sub: 'Timeless Moments', img: '/images/DAV08679.JPG', size: 'md' },
  { id: 'wa65', category: 'weddings', title: 'Couple Session', sub: 'Indian Wedding', img: '/images/DSC09551.JPG', size: 'tall' },
=======
  { id: 'w1', category: 'weddings', title: 'Max & Emily', sub: 'Mumbai Palace', img: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', size: 'feature' },
  { id: 'w2', category: 'weddings', title: 'Sarah & James', sub: 'Santorini, Greece', img: 'https://images.unsplash.com/photo-1519741196428-6a2175fa2557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900', size: 'tall' },
  // { id: 'w3', category: 'weddings', title: 'Meera & Raj', sub: 'Jaipur Heritage', img: 'https://images.unsplash.com/photo-1686294588684-9607a670181c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900', size: 'wide' },
  { id: 'w4', category: 'weddings', title: 'Ananya & Vikram', sub: 'Delhi Ceremony', img: 'https://images.unsplash.com/photo-1573676048035-9c2a72b6a12a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', size: 'md' },
  { id: 'w5', category: 'weddings', title: 'Emma & Lucas', sub: 'Paris, France', img: 'https://images.unsplash.com/flagged/photo-1552981941-424aac2b4311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', size: 'md' },
  { id: 'w6', category: 'weddings', title: 'Kavya & Rohan', sub: 'Goa Beachside', img: 'https://images.unsplash.com/photo-1617724975854-70b5d0cedb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900', size: 'wide' },
  // { id: 'w7', category: 'weddings', title: 'Dia & Karan', sub: 'Udaipur Lake', img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', size: 'sm' },
  { id: 'w8', category: 'weddings', title: 'Rings & Roses', sub: 'Detail shoot', img: 'https://images.unsplash.com/photo-1533091090875-1ff4acc497dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', size: 'sm' },
  { id: 'wa2',  category: 'weddings', title: 'Sacred Vows',       sub: 'Wedding Photography', img: '/images/08.jpg',                       size: 'md'   },
  { id: 'wa4',  category: 'weddings', title: 'Wedding Details',   sub: 'Destination Wedding', img: '/images/Copy%20of%20DSC00698.webp',    size: 'md'   },
  { id: 'wa6',  category: 'weddings', title: 'Reception',         sub: 'Traditional Ceremony',img: '/images/VOW01559.webp',                size: 'md'   },
  { id: 'wa8',  category: 'weddings', title: 'Pre Wedding',       sub: 'Timeless Moments',    img: '/images/Copy%20of%2006.webp',          size: 'wide' },
  { id: 'wa10', category: 'weddings', title: 'Love story',     sub: 'Wedding Photography', img: '/images/DSC02683.webp',                size: 'tall' },
  // { id: 'wa13', category: 'weddings', title: 'Baraat',            sub: 'Royal Ceremony',      img: '/images/Copy%20of%2006.webp',          size: 'wide' },
  { id: 'wa17', category: 'weddings', title: 'Haldi',    sub: 'Indian Wedding',      img: '/images/DSC00506.webp',                size: 'md'   },
  { id: 'wa20', category: 'weddings', title: 'Love Story',        sub: 'Destination Wedding', img: '/images/DSC09533.webp',                size: 'tall' },
  { id: 'wa22', category: 'weddings', title: 'Sacred Vows',       sub: 'Traditional Ceremony',img: '/images/Copy%20of%20DSC07602.webp',   size: 'md'   },
  { id: 'wa24', category: 'weddings', title: 'Wedding Details',   sub: 'Timeless Moments',    img: '/images/DSC08733.webp',                size: 'md'   },
  { id: 'wa25', category: 'weddings', title: 'Couple Session',    sub: 'Indian Wedding',      img: '/images/VOV01532.webp',                size: 'tall' },
  { id: 'wa33', category: 'weddings', title: 'Groom Asthetic',            sub: 'Indian Wedding',      img: '/images/VOV01553.webp',                size: 'wide' },
  { id: 'wa35', category: 'weddings', title: 'Candid Moments',            sub: 'Madworks Studio',     img: '/images/DSC01230.webp',                size: 'tall' },
  { id: 'wa38', category: 'weddings', title: 'Mehndi Details',    sub: 'Traditional Ceremony',img: '/images/DSC00779.webp',                size: 'wide' },
  { id: 'wa41', category: 'weddings', title: 'Golden Hour',   sub: 'Indian Wedding',      img: '/images/Copy%20of%2028.webp',          size: 'md'   },
  // { id: 'wa43', category: 'weddings', title: 'Ceremony Moments',  sub: 'Madworks Studio',     img: '/images/DSC06297.jpg',                size: 'wide' },
  { id: 'wa45', category: 'weddings', title: 'Couple Session',    sub: 'Royal Ceremony',      img: '/images/DSC08858.webp',                size: 'tall' },
  // { id: 'wa46', category: 'weddings', title: 'Reception',         sub: 'Traditional Ceremony',img: '/images/DSC01170.JPG',                size: 'md'   },
  { id: 'wa49', category: 'weddings', title: 'Rings & Roses ',   sub: 'Indian Wedding',      img: '/images/DSC01959.webp',                size: 'md'   },
  { id: 'wa50', category: 'weddings', title: 'Pre Wedding',       sub: 'Timeless Moments',    img: '/images/DSC07239.webp',                size: 'tall' },
  { id: 'wa52', category: 'weddings', title: 'Candid Moments',    sub: 'Destination Wedding', img: '/images/DSC05533.webp',                size: 'md'   },
  { id: 'wa54', category: 'weddings', title: 'Love is in the Air',             sub: 'Traditional Ceremony',img: '/images/DAV08752.webp',                size: 'md'   },
  { id: 'wa56', category: 'weddings', title: 'Wedding Rituals',   sub: 'Timeless Moments',    img: '/images/DSC00802.webp',                size: 'md'   },
  { id: 'wa60', category: 'weddings', title: 'Love Story',        sub: 'Destination Wedding', img: '/images/DSC02888.webp',                size: 'tall' },
  { id: 'wa61', category: 'weddings', title: 'Bridal Portrait',   sub: 'Royal Ceremony',      img: '/images/VOW01642.webp',                size: 'md'   },
  { id: 'wa62', category: 'weddings', title: 'Mehndi Aesthetic',       sub: 'Traditional Ceremony',img: '/images/DSC00845.webp',                size: 'md'   },
  // { id: 'wa63', category: 'weddings', title: 'Ceremony Moments',  sub: 'Candid Portraits',    img: '/images/Copy%20of%20VOW08456.jpg',    size: 'wide' },
  // Wedding Films — YouTube
  { id: 'wv1', category: 'weddings', title: 'Wedding Highlight', sub: 'Madworks Production', img: 'https://img.youtube.com/vi/Oi3rAdX9PNY/maxresdefault.jpg', size: 'feature', youtubeId: 'Oi3rAdX9PNY' },
  { id: 'wv2', category: 'weddings', title: 'Wedding Film', sub: 'Madworks Production', img: 'https://img.youtube.com/vi/2r5cD_3m2Cs/maxresdefault.jpg', size: 'wide', youtubeId: '2r5cD_3m2Cs' },
  { id: 'wv3', category: 'weddings', title: 'Wedding Film', sub: 'Madworks Production', img: 'https://img.youtube.com/vi/_tFSHjqkDlw/maxresdefault.jpg', size: 'tall', youtubeId: '_tFSHjqkDlw' },
  { id: 'wv4', category: 'weddings', title: 'Wedding Film', sub: 'Madworks Production', img: 'https://img.youtube.com/vi/l7HTFpLMM44/maxresdefault.jpg', size: 'md', youtubeId: 'l7HTFpLMM44' },
  // American Weddings
  { id: 'wv5', category: 'weddings', title: 'American Wedding', sub: 'USA', img: 'https://img.youtube.com/vi/g_xDtQcGd3Q/maxresdefault.jpg', size: 'wide', youtubeId: 'g_xDtQcGd3Q' },
  { id: 'wv6', category: 'weddings', title: 'American Wedding', sub: 'USA', img: 'https://img.youtube.com/vi/LorJjQ4IyFA/maxresdefault.jpg', size: 'md', youtubeId: 'LorJjQ4IyFA' },
  { id: 'wv7', category: 'weddings', title: 'American Wedding', sub: 'USA', img: 'https://img.youtube.com/vi/uJsXkcnOZ3Y/maxresdefault.jpg', size: 'md', youtubeId: 'uJsXkcnOZ3Y' },
  // Indian American Weddings
  { id: 'wv8', category: 'weddings', title: 'Indian American Wedding', sub: 'USA', img: 'https://img.youtube.com/vi/LwJtGWeFuCc/maxresdefault.jpg', size: 'feature', youtubeId: 'LwJtGWeFuCc' },
  { id: 'wv9', category: 'weddings', title: 'Indian American Wedding', sub: 'USA', img: 'https://img.youtube.com/vi/t-nrIfTbah0/maxresdefault.jpg', size: 'wide', youtubeId: 't-nrIfTbah0' },
  { id: 'wv10', category: 'weddings', title: 'Indian American Wedding', sub: 'USA', img: 'https://img.youtube.com/vi/vDzpuEeMyTA/maxresdefault.jpg', size: 'tall', youtubeId: 'vDzpuEeMyTA' },
>>>>>>> ea7da798edf3d3cb686e75555a161e7004368459
  // Resort / Hotel
  { id: 'r1', category: 'resort', title: 'The Leela Palace', 'sub': 'Udaipur', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', size: 'feature' },
  { id: 'r2', category: 'resort', title: 'Oberoi Infinity', sub: 'Pool Deck', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900', size: 'wide' },
  { id: 'r3', category: 'resort', title: 'Suite Interior', sub: 'Taj Mumbai', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900', size: 'tall' },
  { id: 'r4', category: 'resort', title: 'Spa & Wellness', sub: 'Ananda Spa', img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', size: 'md' },
<<<<<<< HEAD
  { id: 'r5', category: 'resort', title: 'Rooftop Bar', sub: 'ITC Grand', img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe2fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', size: 'md' },
=======
  { id: 'r5', category: 'resort', title: 'Rooftop Bar', sub: 'ITC Grand', img: 'data:image/jpeg;base64,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', size: 'md' },
>>>>>>> ea7da798edf3d3cb686e75555a161e7004368459
  // Commercial Ads
  { id: 'c1', category: 'commercial', title: 'GlowUp Skincare', sub: 'Brand Campaign', img: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', size: 'feature' },
  { id: 'c2', category: 'commercial', title: 'Titan Watches', sub: 'Instagram Series', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900', size: 'wide' },
  { id: 'c3', category: 'commercial', title: 'FitFuel Protein', sub: 'Product Reel', img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900', size: 'tall' },
  { id: 'c4', category: 'commercial', title: 'Aurelia Jewels', sub: 'Lookbook', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', size: 'md' },
  { id: 'c5', category: 'commercial', title: 'Mango Beverages', sub: 'Corporate Film', img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', size: 'md' },
  // Real Estate
  { id: 're1', category: 'realestate', title: 'Lodha Altus', sub: 'Mumbai Highrise', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', size: 'feature' },
  { id: 're2', category: 'realestate', title: 'Modern Villa', sub: 'Bandra West', img: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900', size: 'wide' },
  { id: 're3', category: 'realestate', title: 'Penthouse Interior', sub: 'South Mumbai', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', size: 'md' },
  { id: 're4', category: 'realestate', title: 'Skyline Towers', sub: 'Pune', img: 'https://images.unsplash.com/photo-1448630360428-65456885c650?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', size: 'md' },
  // Food Photography
  { id: 'f1', category: 'food', title: 'Masala Kitchen', sub: 'Menu Campaign', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', size: 'feature' },
  { id: 'f2', category: 'food', title: 'Artisan Bakery', sub: 'Brand Shoot', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900', size: 'wide' },
  { id: 'f3', category: 'food', title: 'Zaffran Fine Dine', sub: 'Editorial', img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', size: 'md' },
  { id: 'f4', category: 'food', title: 'The Table', sub: 'Social Media', img: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', size: 'md' },
  // Drone Cinematics
  { id: 'd1', category: 'drone', title: 'Coastline Retreat', 'sub': 'Goa Aerial', img: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', size: 'feature' },
  { id: 'd2', category: 'drone', title: 'City at Dusk', sub: 'Mumbai Skyline', img: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', size: 'wide' },
<<<<<<< HEAD
  { id: 'd3', category: 'drone', title: 'Drone 1', sub: 'Aerial Cinematic', img: '/videos/drone1.mp4', size: 'wide' },
  { id: 'd4', category: 'drone', title: 'Drone 2', sub: 'Aerial Cinematic', img: '/videos/drone2.mp4', size: 'tall' },
  { id: 'd5', category: 'drone', title: 'Drone 3', sub: 'Aerial Cinematic', img: '/videos/drone3.mp4', size: 'feature' },
=======
  { id: 'd3', category: 'drone', title: 'Drone 1', sub: 'Aerial Cinematic', img: '/videos/Drone1.mp4', size: 'wide' },
  { id: 'd4', category: 'drone', title: 'Drone 2', sub: 'Aerial Cinematic', img: '/videos/Drone2.mp4', size: 'tall' },
  { id: 'd5', category: 'drone', title: 'Drone 3', sub: 'Aerial Cinematic', img: '/videos/Drone3.mp4', size: 'feature' },
>>>>>>> ea7da798edf3d3cb686e75555a161e7004368459
  // Editing Work
  { id: 'e1', category: 'editing', title: 'Color Mastery', sub: 'Cinematic Grade', img: '/images/colour.jpg', size: 'feature' },
  { id: 'e2', category: 'editing', title: 'Sound & Cut', sub: 'Wedding Film', img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900', size: 'wide' },
];

/* ─── grid size map ─── */
const sizeClass: Record<Size, string> = {
  feature: 'col-span-2 row-span-2',
  wide: 'col-span-2 row-span-1',
  tall: 'col-span-1 row-span-2',
  lg: 'col-span-1 row-span-2',
  md: 'col-span-1 row-span-1',
  sm: 'col-span-1 row-span-1',
};

/* ─── helpers ─── */
const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Hero ─── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center">
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        <img
          src="https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Portfolio hero"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.25) 45%, rgba(5,5,5,0.9) 100%)' }} />

      <motion.div style={{ opacity: fade }} className="relative z-20 mt-55
       text-center px-6 max-w-[860px]">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease }}
          className="text-white mb-7"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(52px,8vw,104px)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
        >
          Portfolio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease }}
          className="mx-auto"
          style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(14px,1.3vw,17px)', lineHeight: 1.9, maxWidth: '460px' }}
        >
          Seven categories. Hundreds of stories. Every frame crafted with obsessive intention.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          className="mt-14 flex flex-col items-center gap-2"
        >
          <span className="uppercase text-[10px] tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.25)' }}>Explore</span>
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
            style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(200,169,106,0.8), transparent)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Category Filter ─── */
function CategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="sticky top-[72px] z-30 py-4"
      style={{
        background: "rgba(5,5,5,0.94)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        ref={scrollRef}
        className="flex items-center gap-2 px-6 md:px-12 overflow-x-auto scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((cat) => {
          const isActive = active === cat.id;

          return (
            <motion.button
              key={cat.id}
              type="button" // ✅ VERY IMPORTANT (prevents form submit)
              onClick={(e) => {
                e.preventDefault();      // ✅ stops unwanted navigation
                e.stopPropagation();     // ✅ prevents parent click issues
                onChange(cat.id);
              }}
              layout
              className="relative flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.18em] transition-all duration-200 cursor-pointer"
              style={{
                color: isActive
                  ? "#0a0a0a"
                  : "rgba(255,255,255,0.4)",
                fontFamily: "var(--font-body)",
              }}
              whileHover={{
                scale: 1.05,
                color: isActive
                  ? "#0a0a0a"
                  : "rgba(255,255,255,0.9)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active background */}
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--accent-gold)" }}
                  transition={{
                    type: "spring",
                    bounce: 0.25,
                    duration: 0.5,
                  }}
                />
              )}

              {/* Label */}
              <span className="relative z-10 whitespace-nowrap">
                {cat.label}
              </span>

              {/* Count */}
              <span
                className="relative z-10 text-[10px] px-1.5 py-0.5 rounded-full"
                style={{
                  background: isActive
                    ? "rgba(0,0,0,0.2)"
                    : "rgba(255,255,255,0.07)",
                  color: isActive
                    ? "rgba(0,0,0,0.6)"
                    : "rgba(255,255,255,0.3)",
                }}
              >
                {cat.count}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
/* ─── Portfolio Card ─── */
<<<<<<< HEAD
function PortfolioCard({ item, onClick, index }: { item: Item; onClick: () => void; index: number }) {
=======
const PortfolioCard = memo(function PortfolioCard({ item, onOpen, index }: { item: Item; onOpen: (id: string) => void; index: number }) {
>>>>>>> ea7da798edf3d3cb686e75555a161e7004368459
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
  <motion.div
    ref={ref}
<<<<<<< HEAD
    layout
    initial={{ opacity: 0, scale: 0.96 }}
    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
    exit={{ opacity: 0, scale: 0.93 }}
    transition={{ duration: 0.65, delay: (index % 6) * 0.07, ease }}
    className={`relative group overflow-hidden cursor-pointer ${sizeClass[item.size]}`}
    style={{ backgroundColor: '#111' }}
    onClick={onClick}
    whileHover={{ zIndex: 2 }}
  >
    
    {/* ✅ MEDIA (CORRECT POSITION) */}
=======
    initial={{ opacity: 0, scale: 0.96 }}
    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.55, delay: (index % 8) * 0.05, ease }}
    className={`relative group overflow-hidden cursor-pointer ${sizeClass[item.size]}`}
    style={{ backgroundColor: '#111' }}
    onClick={() => onOpen(item.id)}
    whileHover={{ zIndex: 2 }}
  >

    {/* MEDIA */}
>>>>>>> ea7da798edf3d3cb686e75555a161e7004368459
    {item.img.endsWith('.mp4') ? (
      <video
        src={item.img}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    ) : (
      <motion.img
        src={item.img}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.7 }}
      />
    )}

<<<<<<< HEAD
    {/* overlay */}
    <div
      className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
      style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.1) 55%, transparent 100%)' }}
    />

    {/* info */}
    <div className="absolute bottom-4 left-4 right-4">
      <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] mb-1">
        {item.sub}
      </p>
      <p className="text-white font-medium">
        {item.title}
      </p>
    </div>

  </motion.div>
);
}
=======
    {/* YouTube play button */}
    {item.youtubeId && (
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(200,169,106,0.9)', boxShadow: '0 0 32px rgba(200,169,106,0.4)' }}>
          <Play size={20} fill="#0a0a0a" color="#0a0a0a" style={{ marginLeft: '3px' }} />
        </div>
      </div>
    )}

    {/* overlay */}
    <div
      className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
      style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.1) 55%, transparent 100%)' }}
    />

    {/* info */}
    <div className="absolute bottom-4 left-4 right-4">
      <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] mb-1">
        {item.sub}
      </p>
      <p className="text-white font-medium">
        {item.title}
      </p>
    </div>

  </motion.div>
);
});
>>>>>>> ea7da798edf3d3cb686e75555a161e7004368459
/* ─── Lightbox ─── */
function Lightbox({ items, index, onClose, onNav }: {
  items: Item[]; index: number; onClose: () => void; onNav: (dir: 1 | -1) => void
}) {
  const item = items[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onNav]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(5,5,5,0.96)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      {/* close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center transition-colors z-10 cursor-pointer"
        style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
      >
        <X size={18} color="white" />
      </button>

      {/* counter */}
      <div
        className="absolute top-6 left-6 text-xs uppercase tracking-[0.2em] z-10"
        style={{ color: 'rgba(255,255,255,0.35)' }}
      >
        {index + 1} / {items.length}
      </div>

      {/* main image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.03, y: -12 }}
          transition={{ duration: 0.4, ease }}
          className="relative max-w-[88vw] max-h-[80vh] flex flex-col"
          onClick={e => e.stopPropagation()}
        >
<<<<<<< HEAD
          {item.img.endsWith('.mp4') ? (
=======
          {item.youtubeId ? (
  <div style={{ width: 'min(88vw, 900px)', aspectRatio: '16/9' }}>
    <iframe
      src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3`}
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      className="w-full h-full rounded-xl shadow-2xl border-0"
    />
  </div>
) : item.img.endsWith('.mp4') ? (
>>>>>>> ea7da798edf3d3cb686e75555a161e7004368459
  <video
    src={item.img}
    controls
    autoPlay
    className="max-w-full max-h-[72vh] rounded-xl shadow-2xl"
  />
) : (
  <img
    src={item.img}
    alt={item.title}
    className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"
  />
)}
          {/* info bar */}
          <div className="mt-5 flex items-end justify-between gap-4 px-1">
            <div>
              <p className="uppercase text-[10px] tracking-[0.22em] mb-1" style={{ color: 'var(--accent-gold)' }}>
                {categories.find(c => c.id === item.category)?.label}
              </p>
              <p className="text-white" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(18px,2vw,26px)' }}>
                {item.title}
              </p>
              <p className="text-white/40 text-sm mt-0.5">{item.sub}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onNav(-1)}
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <ArrowLeft size={16} color="white" />
              </button>
              <button
                onClick={() => onNav(1)}
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                style={{ background: 'rgba(200,169,106,0.85)' }}
              >
                <ArrowRight size={16} color="#0a0a0a" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Category headline ─── */
function CategoryHeadline({ cat }: { cat: typeof categories[0] }) {
  return (
    <motion.div
      key={cat.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="col-span-full flex items-end justify-between pb-2"
      style={{ borderBottom: '1px solid var(--mode-border)' }}
    >
      <div>
        <p className="uppercase text-[10px] tracking-[0.28em] mb-2" style={{ color: 'var(--accent-gold)' }}>
          {cat.id === 'all' ? 'Complete Portfolio' : 'Category'}
        </p>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px,3vw,42px)', lineHeight: 1.1, color: 'var(--mode-text)' }}>
          {cat.label}
        </h2>
      </div>
      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '52px', lineHeight: 1, color: 'var(--mode-logo-num)', fontStyle: 'italic' }}>
        {String(cat.count).padStart(2, '0')}
      </span>
    </motion.div>
  );
}

/* ─── Page ─── */
export function PortfolioPage() {
  const [active, setActive] = useState('all');
  const [lightboxId, setLightboxId] = useState<string | null>(null);

  // ✅ filtering
  const filtered = useMemo(() => {
    return active === 'all'
      ? items
      : items.filter(i => i.category === active);
  }, [active]);

  const activeCat = categories.find(c => c.id === active)!;

  // ✅ open / close
  const openLightbox = useCallback((id: string) => {
    setLightboxId(id);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxId(null);
    document.body.style.overflow = '';
  }, []);

  // ✅ current index derived safely
  const currentIndex = useMemo(() => {
    if (!lightboxId) return -1;
    return filtered.findIndex(i => i.id === lightboxId);
  }, [filtered, lightboxId]);

  // ✅ navigation (fixed)
  const navLightbox = useCallback((dir: 1 | -1) => {
    if (!lightboxId || filtered.length === 0) return;

    const currentIndex = filtered.findIndex(i => i.id === lightboxId);
    if (currentIndex === -1) return;

    const nextIndex =
      (currentIndex + dir + filtered.length) % filtered.length;

    setLightboxId(filtered[nextIndex].id);
  }, [filtered, lightboxId]);

  // ✅ category change
  const handleCategoryChange = (id: string) => {
    setActive(id);
    setLightboxId(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <Hero />

      <CategoryFilter active={active} onChange={handleCategoryChange} />

      {/* GRID */}
      <section className="px-4 md:px-8 pt-4 pb-20" style={{ backgroundColor: 'var(--mode-surface)' }}>
        <div className="max-w-[1400px] mx-auto">

          {/* HEADER */}
          <div className="px-2 mb-3">
            <CategoryHeadline cat={activeCat} />
          </div>

          {/* GRID */}
<<<<<<< HEAD
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridAutoRows: '280px',
              gap: '6px'
            }}
          >
            <AnimatePresence mode="popLayout">
=======
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridAutoRows: '280px',
                gap: '6px',
              }}
            >
>>>>>>> ea7da798edf3d3cb686e75555a161e7004368459
              {filtered.map((item, i) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  index={i}
<<<<<<< HEAD
                  onClick={() => openLightbox(item.id)} // ✅ FIXED
=======
                  onOpen={openLightbox}
>>>>>>> ea7da798edf3d3cb686e75555a161e7004368459
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* EMPTY */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <p style={{
                color: 'rgba(255,255,255,0.2)',
                fontFamily: 'var(--font-heading)',
                fontSize: '24px'
              }}>
                No items in this category yet.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxId !== null && currentIndex !== -1 && (
          <Lightbox
            items={filtered}
            index={currentIndex}
            onClose={closeLightbox}
            onNav={navLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
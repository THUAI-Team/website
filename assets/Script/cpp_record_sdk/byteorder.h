#ifndef BYTEORDER_H
#define BYTEORDER_H

#if (defined(_WIN16) || defined(_WIN32) || defined(_WIN64)) && !defined(__WINDOWS__)
  #define __WINDOWS__
#endif

#if defined(__linux__) || defined(__CYGWIN__)
  #include <endian.h>
#elif defined(__APPLE__)
  #include <libkern/OSByteOrder.h>
  #define __BYTE_ORDER BYTE_ORDER
  #define __BIG_ENDIAN BIG_ENDIAN
  #define __LITTLE_ENDIAN LITTLE_ENDIAN
  #define __PDP_ENDIAN PDP_ENDIAN
#elif defined(__OpenBSD__) || defined(__NetBSD__) || defined(__FreeBSD__) || defined(__DragonFly__)
  #include <sys/endian.h>
#elif defined(__WINDOWS__)
  #include <winsock2.h>
  #define __BYTE_ORDER BYTE_ORDER
  #define __BIG_ENDIAN BIG_ENDIAN
  #define __LITTLE_ENDIAN LITTLE_ENDIAN
  #define __PDP_ENDIAN PDP_ENDIAN
#endif

#endif
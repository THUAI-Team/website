#ifndef RECORD_FILE_STRUCT_H
#define RECORD_FILE_STRUCT_H

#include <cstdint>
#include <ctime>
#include "byteorder.h"

#if BYTE_ORDER != LITTLE_ENDIAN
  #error "Only support little-endian architectures"
#endif


using std::uint16_t;
using std::uint32_t;
using std::time_t;

namespace thuai {
  #pragma pack(push, 1)
  struct RecordFileHeader {
    char file_signature[6] = {'T', 'H', 'A', 'I', 'E', 'G'};
    uint16_t format_version = 1; // default version is 1
    uint16_t frame_count; // total frames in the file
    uint16_t fps;     // frames per sec
    uint32_t r_score; // score of red team
    uint32_t y_score; // score of yellow team
    uint32_t b_score; // score of blue team
    int64_t timestamp; // the UNIX timestamp of game start
    uint8_t egg_scores[15]; // scores of all eggs
  };
  #pragma pack(pop)

  static_assert(sizeof(RecordFileHeader) == 47ull, "Wrong header size"); 
  static_assert(sizeof(float) == 4ull, "Float must be 4 bytes");

  #pragma pack(push, 1)
  struct RecordFileFrame {
    float egg_x[15];
    float egg_y[15];
    float player_x[12];
    float player_y[12];
    int8_t egg_in_hand[12]; // the egg that player i is holding; -1 means empty hands
    uint8_t endurance_zipped[12]; // floor(endurance / 5 * 255)
  };

  static_assert(sizeof(RecordFileFrame) == 240ul, "Wrong frame size");
  #pragma pack(pop)
}

#endif
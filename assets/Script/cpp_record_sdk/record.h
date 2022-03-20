#ifndef RECORD_H
#define RECORD_H

#include <ostream>
#include <vector>
#include <ctime>
#include <cstdint>
#include "record_file_struct.h"
#include "entities.h"

namespace thuai {
  /*
   * Usage:
   * - Initialize before simulation
   * - for each simulation cycle:
   *   - call add_frame()
   *   - use set_egg_in_frame & set_player_in_frame to insert relevant 
   *     data into *current* frame
   * - set final scores with set_score(...)
   * - serialization
  */
  class Record {
    uint16_t m_fps;
    uint32_t m_r_score = 0, m_y_score = 0, m_b_score = 0;
    time_t m_timestamp;
    uint8_t m_egg_scores[15];
    std::vector<RecordFileFrame> m_frames;
  public:
    Record(uint16_t fps);

    void set_score(uint32_t r_score, uint32_t y_score, uint32_t b_score);
    void init_egg_score(const Egg &);

    int add_frame(void); // return: id of last frame, e.g. frame 0, frame 1, ...
    size_t frame_count(void) const; // return: size of m_frames
    void set_egg_in_frame(const Egg &);
    void set_player_in_frame(const Player &);

    bool serialize(std::ostream &os) const; // os must be opened in binary mode!
  };
}

#endif

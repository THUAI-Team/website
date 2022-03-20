#include <algorithm>
#include "record.h"
#include "entities.h"

namespace thuai {
  Record::Record(uint16_t fps): m_fps(fps) {
    m_r_score = m_y_score = m_b_score = 0;
    m_timestamp = time(nullptr); // should be initiated at game start
  }

  void Record::set_score(uint32_t r_score, uint32_t y_score, uint32_t b_score) {
    m_r_score = r_score, m_y_score = y_score, m_b_score = b_score;
  }

  void Record::init_egg_score(const Egg &egg) {
    m_egg_scores[egg.id()] = egg.score();
  }

  int Record::add_frame(void) {
    m_frames.push_back(RecordFileFrame());
    return m_frames.size() - 1;
  }

  size_t Record::frame_count(void) const {
    return m_frames.size();
  }

  void Record::set_egg_in_frame(const Egg &egg) {
    Vec2D pos = egg.position();
    m_frames.back().egg_x[egg.id()] = pos.x;
    m_frames.back().egg_y[egg.id()] = pos.y;
  }

  void Record::set_player_in_frame(const Player &player) {
    Vec2D pos = player.position();
    m_frames.back().player_x[player.id()] = pos.x;
    m_frames.back().player_y[player.id()] = pos.y;
    m_frames.back().egg_in_hand[player.id()] = player.egg();
    m_frames.back().endurance_zipped[player.id()] = \
      static_cast<uint8_t>(player.endurance() / 5.0f * 255.0f);
  }

  bool Record::serialize(std::ostream &os) const {
    RecordFileHeader header;
    header.frame_count = frame_count();
    header.fps = m_fps;
    header.r_score = m_r_score, header.y_score = m_y_score, header.b_score = m_b_score;
    header.timestamp = m_timestamp;
    std::copy(std::begin(m_egg_scores), std::end(m_egg_scores), header.egg_scores);
    os.write(reinterpret_cast<const char*>(&header), sizeof(header));

    for (const auto &frame : m_frames) {
      os.write(reinterpret_cast<const char*>(&frame), sizeof(frame));
    }

    return os.good();
  }
}

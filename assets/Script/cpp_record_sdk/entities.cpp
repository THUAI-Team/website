#include <cassert>
#include <cmath>
#include "entities.h"

namespace thuai {

  double Vec2D::length() const { return sqrt(x*x + y*y); }

  Vec2D Vec2D::normalized() const {
    Vec2D ret = *this;
    double len = this->length();
    if (len < 1e-5) {
      return Vec2D{.0, .0};
    } else {
      ret.x /= len; ret.y /= len;
      return ret;
    }
  }

  Entity::Entity(): m_pos({.0, .0}), m_velocity({.0, .0}) {}

  void Entity::set_position(Vec2D new_pos) {
    this->m_pos = new_pos;
  }

  Vec2D Entity::position(void) const {
    return this->m_pos;
  }

  void Entity::set_velocity(Vec2D new_velocity) {
    this->m_velocity = new_velocity;
  }

  Vec2D Entity::velocity(void) const {
    return this->m_velocity;
  }

  void Entity::set_facing(Vec2D new_facing) {
    this->m_facing = new_facing;
  }

  Vec2D Entity::facing(void) const {
    return this->m_facing;
  }

  Player::Player(int id) {
    assert(0 <= id && id < PLAYER_COUNT);
    m_id = id; m_egg_id = -1;
    m_endurance = 5.0;
    if (0 <= m_id && m_id < 4) {
      m_team = RED;
    } else if (4 <= m_id && m_id < 8) {
      m_team = YELLOW;
    } else {
      m_team = BLUE;
    }
  }

  void Player::set_status(PlayerStatus new_status) {
    m_status = new_status;
  }

  PlayerStatus Player::status(void) const {
    return m_status;
  }

  void Player::set_endurance(float new_endurance) {
    assert(-1e-7 <= new_endurance && new_endurance <= 5 + 1e-7);
    m_endurance = new_endurance;
  }
  float Player::endurance(void) const {
    return m_endurance;
  }

  void Player::set_egg(int new_egg_id) {
    assert(-1 <= new_egg_id && new_egg_id < EGG_COUNT);
    this->m_egg_id = new_egg_id;
  }

  int Player::egg(void) const {
    return this->m_egg_id;
  }

  int Player::id(void) const {
    return m_id;
  }

  Team Player::team(void) const {
    return m_team;
  }


  Egg::Egg(int id, int score): m_id(id), m_score(score) {}

  int Egg::id(void) const {
    return m_id;
  }
  int Egg::score(void) const {
    return m_score;
  }
}

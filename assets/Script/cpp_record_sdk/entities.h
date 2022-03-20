#ifndef ENTITIES_H
#define ENTITIES_H

namespace thuai {

  const int EGG_COUNT = 15, PLAYER_COUNT = 12;

  struct Vec2D {
    double x, y;
    double length() const;
    Vec2D normalized() const;
  };

  enum Team {
    RED, YELLOW, BLUE
  };

  enum PlayerStatus {
    STOPPED, SLIPPED, WALKING, RUNNING
  };

  class Entity {
    Vec2D m_pos, m_velocity, m_facing;
  public:
    Entity();
    void set_position(Vec2D new_pos);
    Vec2D position(void) const;
    void set_velocity(Vec2D new_pos);
    Vec2D velocity(void) const;
    void set_facing(Vec2D new_pos);
    Vec2D facing(void) const;
 };

  class Player: public Entity {
    int m_id, m_egg_id;
    Team m_team;
    float m_endurance;
    PlayerStatus m_status;
    
  public:
    Player(int id);
    void set_endurance(float new_endurance);
    void set_status(PlayerStatus);
    float endurance(void) const;
    void set_egg(int new_egg_id);
    int egg(void) const;
    int id(void) const;
    PlayerStatus status(void) const;
    Team team(void) const;
  };

  class Egg: public Entity {
    int m_id, m_score;

  public:
    Egg(int id, int score);
    int id(void) const;
    int score(void) const;
  };
}
#endif

#include <fstream>
#include <iostream>
#include <cstdlib>
#include "record.h"

using namespace std;
using namespace thuai;

int main(void) {
  Record rec(60);
  Egg * eggs[EGG_COUNT];

  for (int i = 0; i < EGG_COUNT; i++) {
    unsigned char score = rand() * 10.0f / RAND_MAX + 10.0f;
    eggs[i] = new Egg(i, score);
    Vec2D pos = Vec2D{rand() * 25.0f / RAND_MAX, rand() * 25.0f / RAND_MAX};
    eggs[i]->set_position(pos);
    rec.init_egg_score(*(eggs[i]));
    cout << "Egg #" << i << ": @" << pos.x << ',' << pos.y << "; score: " << (int)score << endl;
  }

  for (int t = 0; t < 3; t++) {
    rec.add_frame();
    cout << "Frame #" << t << endl;
    for (int i = 0; i < PLAYER_COUNT; i++) {
      Vec2D pos = Vec2D{rand() * 25.0f / RAND_MAX, rand() * 25.0f / RAND_MAX};
      float endurance = rand() * 5.0f / RAND_MAX;
      int egg_id = EGG_COUNT - i - 1;
      cout << "Player #" << i << ": @" << pos.x << ',' << pos.y << "; ";
      cout << "endurance:" << endurance << "; egg:" << egg_id << endl;

      Player player(i);
      player.set_position(pos);
      player.set_endurance(endurance);
      player.set_egg(egg_id);
      rec.set_player_in_frame(player);
    }
    for (int i = 0; i < EGG_COUNT; i++) {
      rec.set_egg_in_frame(* (eggs[i]));
    }
  }
  rec.set_score(12, 34, 56);

  ofstream of("out.bin", std::ios::binary);
  rec.serialize(of);

  return 0;
}
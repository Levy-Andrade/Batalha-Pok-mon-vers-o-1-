package com.example.pokedex_backend.service;

import com.example.pokedex_backend.model.Pokemon;
import org.springframework.stereotype.Service;

@Service
public class BattleService {
    public String lutar(Pokemon p1, Pokemon p2) {
        // Lógica simples: Quem tem mais ataque ganha
        // Mas a defesa do outro diminui o dano
        int poderP1 = p1.getAtaque() - p2.getDefesa();
        int poderP2 = p2.getAtaque() - p1.getDefesa();

        if (poderP1 > poderP2) {
            return p1.getNome() + " VENCEU a batalha contra " + p2.getNome() + "!";
        } else if (poderP2 > poderP1) {
            return p2.getNome() + " VENCEU a batalha contra " + p1.getNome() + "!";
        } else {
            return "Foi um EMPATE épico entre " + p1.getNome() + " e " + p2.getNome() + "!";
        }
    }
}

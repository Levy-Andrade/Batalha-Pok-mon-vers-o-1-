package com.example.pokedex_backend.controller;

import com.example.pokedex_backend.model.Pokemon;
import com.example.pokedex_backend.service.BattleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*") 
@RequestMapping("/api/batalha")
public class BattleController {

    @Autowired
    private BattleService battleService;

    @GetMapping
    public String iniciarBatalha() {
        // Criando o Pikachu
        Pokemon p1 = new Pokemon();
        p1.setNome("Pikachu");
        p1.setAtaque(80);
        p1.setDefesa(40);
        p1.setImageUrl("https://githubusercontent.com");

        // Criando o Charizard
        Pokemon p2 = new Pokemon();
        p2.setNome("Charizard");
        p2.setAtaque(90);
        p2.setDefesa(70);
        p2.setImageUrl("https://githubusercontent.com");

        return battleService.lutar(p1, p2);
    }
}

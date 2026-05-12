package com.example.pokedex_backend.controller;

import com.example.pokedex_backend.model.Pokemon;
import com.example.pokedex_backend.service.BattleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*") // <--- Use esta linha completa
public class BatalhaController {

    @Autowired
    private BattleService battleService;

    @GetMapping
    public Map<String, String> iniciarBatalha() {

        Pokemon p1 = new Pokemon();
        p1.setNome("Pikachu");
        p1.setAtaque(80);
        p1.setDefesa(40);
        p1.setImageUrl("https://githubusercontent.com");

        Pokemon p2 = new Pokemon();
        p2.setNome("Charizard");
        p2.setAtaque(90);
        p2.setDefesa(70);
        p2.setImageUrl("https://githubusercontent.com");

        String resultadoMensagem = battleService.lutar(p1, p2);

        Map<String, String> response = new HashMap<>();
        response.put("mensagem", resultadoMensagem);

        if (resultadoMensagem.contains("Charizard")) {
            response.put("vencedor", "Charizard");
        } else {
            response.put("vencedor", "Pikachu");
        } 

        return response;
    } 
} 
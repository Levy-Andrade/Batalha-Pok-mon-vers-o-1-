package com.example.pokedex_backend.controller;

import com.example.pokedex_backend.model.Pokemon;
import com.example.pokedex_backend.repository.PokemonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pokemon")
public class PokemonController {

    @Autowired
    private PokemonRepository repository;

    @GetMapping
    public List<Pokemon> listarTodos() {
        return repository.findAll();
    }

    @PostMapping
    public Pokemon salvar(@RequestBody Pokemon pokemon) {
        return repository.save(pokemon);
    }
}
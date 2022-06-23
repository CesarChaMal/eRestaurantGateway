package com.erestaurant.gateway.repository;

import com.erestaurant.gateway.domain.Profile;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data SQL reactive repository for the Profile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfileRepository extends ReactiveCrudRepository<Profile, String>, ProfileRepositoryInternal {
    @Override
    <S extends Profile> Mono<S> save(S entity);

    @Override
    Flux<Profile> findAll();

    @Override
    Mono<Profile> findById(String id);

    @Override
    Mono<Void> deleteById(String id);
}

interface ProfileRepositoryInternal {
    <S extends Profile> Mono<S> save(S entity);

    Flux<Profile> findAllBy(Pageable pageable);

    Flux<Profile> findAll();

    Mono<Profile> findById(String id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Profile> findAllBy(Pageable pageable, Criteria criteria);

}

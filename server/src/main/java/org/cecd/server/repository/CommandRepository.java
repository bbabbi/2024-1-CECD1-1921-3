package org.cecd.server.repository;

import org.cecd.server.domain.Command;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandRepository extends JpaRepository<Command, Long> {
}
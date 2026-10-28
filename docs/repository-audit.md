# Public repository audit

Audit date: 28 October 2026. Inspected all six public repositories owned by `yumumumule` via authenticated GitHub API metadata, read-only shallow clones, README files, source, tests, and committed result artifacts. None of the existing project repositories was modified. This was a portfolio evidence review; the upstream experiments and test suites were not rerun.

## Ranking and selection

Ranks are comparative judgments for this portfolio, not numerical measures of project quality.

| Repository | ML engineering | AI research | Software engineering | Decision |
| --- | ---: | ---: | ---: | --- |
| [movie-recommendation-system](https://github.com/yumumumule/movie-recommendation-system) | 1 | 3 | 1 | Feature: complete small-scale offline model/evaluation/CLI workflow |
| [clip-background-bias](https://github.com/yumumumule/clip-background-bias) | 2 | 1 | 4 | Feature: controlled vision experiment with paired uncertainty and limitations |
| [Multi-Armed-Bandits](https://github.com/yumumumule/Multi-Armed-Bandits) | 3 | 2 | 5 | Feature: probability course study connecting algorithms, theory, and simulations |
| [maze-explorer](https://github.com/yumumumule/maze-explorer) | 5 | 5 | 2 | Feature: cohesive C program with generation, pathfinding, state, and tests |
| [cuhk-coursework](https://github.com/yumumumule/cuhk-coursework) | 4 | 4 | 3 | Secondary link: broad course collection; its Nash solver merits future standalone treatment |
| [hanlin-zhao](https://github.com/yumumumule/hanlin-zhao) | — | — | — | Biography source, not an implementation project |

## Evidence and limits

### Movie recommendation system

- Snapshot: `97f2f4e0a906afdfb3ca9f17f06b7ba53390ce97`.
- Inspected `README.md`, `src/models.py`, source structure, tests inventory, `results/metrics.csv`, and result/evaluation documentation.
- Python/NumPy implementations of global, user, and item means; regularized additive biases; biased matrix factorization using mini-batch SGD. Includes fitted ID mappings, repeated-ID gradient accumulation, cold starts, NPZ persistence, training/recommendation CLIs, and ranking evaluation.
- `results/metrics.csv` records MF test RMSE 0.8578108414784495 versus global mean 1.0388919969874693. Reported rounded values are tied to one seeded MovieLens split, not a production or general benchmark claim.
- Full-catalogue Top-10 results do not show MF outperforming the constant-score baselines. The site preserves this limitation.
- The README describes independent development informed by STAT3009. GitHub currently confirms public visibility even though an outdated README sentence calls it private. No publication or serving deployment is claimed.

### CLIP background bias

- Snapshot: `1a275b948e023ee42172a5e19ecafefa68e8a691`.
- Inspected README, inference orchestration, model/preprocessing structure, tests inventory, and `results/main/accuracy.csv` plus paired-results documentation.
- AIST1000 seminar project using frozen CLIP ViT-B/32, Oxford-IIIT Pet annotations, 370 images, 11 paired/control conditions, and class-stratified paired bootstrap intervals. No training or fine-tuning.
- Committed full-original accuracy is 0.8378378378378378 and crop-original accuracy is 0.8324324324324325. Both intervals for crop-versus-full flip-rate reductions include zero.
- Segmentation is supplied by dataset annotations; small sample, compositing artifacts, and one model/prompt constrain interpretation. The site does not claim a proven robustness improvement.

### Multi-Armed-Bandits

- Snapshot: `cae89d03406db950bea0039a1cd03ed9ffb03aa4`.
- Inspected README, `src/algorithms.py`, experiment/result inventory, trial CSV structure, and configuration/report descriptions.
- ESTR2018 Probability for Engineers course project. Implements uniform random, fixed ε-greedy, and UCB1 for stationary Bernoulli bandits, randomized initialization/ties, paired random streams, and multiple simulation studies.
- Main configuration: 300 independent trials, 5,000 rounds. Committed data support comparisons under that configuration; simulations do not prove asymptotic rates.
- README installation instructions still use an earlier repository name. Website links use the current verified repository URL.

### Maze Explorer

- Snapshot: `93ff85900b8803b28a3f95bdbc578594afb65981`.
- Inspected README, `main.c`, `maze_game.h`, CMake/test inventory.
- C11 game developed from ESTR1002 coursework. Iterative depth-first generation, xorshift seed handling, BFS shortest distances, matching portals, game-state/energy/hint logic, and separate Windows console abstraction.
- Test source covers 1,200 seeded mazes. Upstream documentation records Windows builds; Linux/macOS/MSVC execution is not claimed verified by this audit.

### CUHK coursework

- Snapshot: `4ec583df46eab9a110c956f4d80562caea12f953`.
- Inspected root/course READMEs, tree, and Nash-solver source excerpts.
- C exercises and regression structure, R statistical work, and a C11 ESTR1005 bimatrix Nash solver for 1–3 actions per player, including linear-system code with partial pivoting.
- Useful engineering evidence, but a mixed collection is less focused than the four featured standalone repositories. Not presented as original published research.

### Biography repository

- Snapshot: `879d834c5089bad74852b9d79d10c7dd87ca4850`.
- README corroborates the owner's supplied degree, graduation year, research affiliation/interests, AgentVLA experimental involvement, CGPA, and Dean's List. Self-authored profile text is not independent institutional verification.
- Its telephone and student-number-based email were deliberately excluded from the website and this audit.

## Attribution

GitHub commit metadata associates `yumumumule` with commits in the recommender, bandit, coursework, and biography repositories. Some commits are attributed to `zhl2104405665-max`, including the audited CLIP and maze snapshots. Account ownership alone does not establish sole authorship or map another account to the portfolio owner. The site describes repository implementations and uses the owner's account/project identification, without asserting independent authorship of every line or the whole lab system. Confirm collaborator credit if expanding attribution.

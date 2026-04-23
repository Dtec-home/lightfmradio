1. Core UI & Logic
Framework: Compose Multiplatform (KMP) — The modern standard for sharing UI and logic (Android, iOS, Desktop, Web).

Navigation: Compose Navigation (with Type Safety) — The official Google library for routing.

Architecture: Circuit (by Slack) — A "Compose-native" architecture that makes state management feel like React hooks.

2. Styling & Design System
Base Components: Material 3 (M3) — The Android equivalent to a high-end component library.

Layout/Styling: Compose Modifiers — The "Tailwind" of Kotlin; utility-based styling directly in the code.

Icons: Lucide-Kotlin or Material Symbols — Clean, modern vector icons.

Image Loading: Coil — The industry standard for asynchronous image loading and caching.

3. Networking & Data
API Client: Ktor Client — A lightweight, multiplatform engine for HTTP requests (replaces Axios/Fetch).

JSON Handling: Kotlinx Serialization — Fast, compiler-level type safety for JSON parsing.

Local Database: Room or SQLDelight — Type-safe SQL caching for offline-first capabilities.

Remote Data/Caching: Store5 — The "TanStack Query" of the Kotlin world for managing network state and cache.

4. Infrastructure & Tooling
Dependency Injection: Koin — A pragmatic, lightweight DI framework that is much easier to set up than Dagger/Hilt.

Concurrency: Kotlin Coroutines & Flow — Native reactive programming for handling background tasks and streams.

Dependency Management: Version Catalogs (libs.versions.toml) — The modern way to manage library versions centrally.

Build System: Gradle (Kotlin DSL) — Use .gradle.kts files for a full-scripting experience during builds.

From the above tech stack I need you go through a next JS application that I have
document everything from ui to features
It is a simple website listening from a streaming azura-cast backend and supports articles, and listening for users

I only want to create the user facing side
Now I want you to got thorugh the code and come up with a complete sprint breakdown of building the mobile app in the above tooling

For the full SDLC, STLC, QA process, design etc

The output should be an MD document which I will import in android studio and proceed with the development

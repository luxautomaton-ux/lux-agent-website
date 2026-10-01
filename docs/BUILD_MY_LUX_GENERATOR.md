# Build My Lux — Customer Setup Generator

## Canonical customer funnel

1. Choose a **Success Pack first**.
2. Optionally add one or more **Memory Packs**.
3. Keep the included standard team or purchase **Premium Team Customization**.
4. Choose Lux Agent Desktop, Lux Agent USB, or both.
5. Review the configuration.
6. Checkout / entitlement.
7. Generate a server-signed Lux Setup Bundle.
8. Install after customer review.

Success Packs are the prebuilt agent/team setup. Custom agent creation is not the default funnel.

## Standard team

LANA is included in every Lux Agent installation and is the command/executive coordinator.
The standard customer team uses generic role identities:
- LANA / Command
- Sales Agent
- Marketing Agent
- Operations Agent
- Automation & Build Agent
- Finance Agent
- Research Agent
- Social & Content Agent

## Standard voice and behavior

Default customer agents are:
- warm and professional
- clear and easy to understand
- customer-service oriented
- business-focused
- respectful and helpful
- calm rather than robotic or overhyped
- conservative about claims and consequential actions

Generic role behavior is the standard product. Customer-specific names, personas, department redesign,
and voice-style customization are Premium Team Customization.

## Pack libraries

Canonical source library on the founder MacBook Pro:
- `Desktop/LUX_AGENT_USB/LUX_SUCCESS_PACKS_100_FULL_SET`
- `Desktop/LUX_AGENT_USB/LUX_MEMORY_PACKS_100_ENHANCEMENT_LIBRARY`

The website ships compact catalog copies generated from:
- `LUX_SUCCESS_PACK_IMPORT_ALL_100.json`
- `LUX_MEMORY_PACK_IMPORT_ALL_100.json`

## Installation boundary

The website may create an unsigned configuration preview, but it must not pretend that preview is an entitlement or installer.

Production flow:
- payment succeeds
- customer entitlement is created
- server validates owned Success Packs, Memory Packs, customization, and install targets
- server signs the Lux Setup Bundle
- Lux Agent Desktop verifies the signature and entitlement
- customer reviews the pending changes
- Desktop installs the setup and creates an install receipt
- when USB is selected, Desktop writes the approved portable setup to the customer-owned compatible drive

No credentials belong inside the setup manifest.
The browser does not silently install software or write USB drives.

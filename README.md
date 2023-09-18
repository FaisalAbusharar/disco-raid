# DiscoRaid Bot

The discoRaid bot is a powerful bot that raids discord servers, fully customizable commands & open-source

All messages between you & the bot are private. No messages will be sent to the server.

## Features

- **Online Check**
  - `online` command allows you to check if DiscoRaid is online.

- **Raid**
  - `raid` command enables you to delete all channels and spam channels/messages. 
    - *Permission Required*: `MANAGE CHANNELS`
    - Options:
      - `raid-message`: Message that should be spammed during the raid (you can add more than one, seperated by '|').
      - `channel-amount`: The amount of channels that should be created.
      - `channel-names`: The names of the channels made (you can add more than one, separated by '|').
      - `message-amt-per-channel`: Amount of messages sent per channel.

- **Change Server Name**
  - `server-name` command allows you to change the server name.
    - *Permission Required*: `MANAGE SERVER`
    - Options:
      - `server_name`: The new server name.

- **Admin Self**
  - `admin-self` command gives the user ADMIN permissions.
    - *Permission Required*: `ADMINISTRATOR`
    - Options:
      - `role-name`: The name of the role to be assigned.

- **Admin All**
  - `admin-all` command gives ALL users ADMIN permissions.
    - *Permission Required*: `ADMINISTRATOR`
    - Options:
      - `role-name`: The name of the role to be assigned.

- **Ban All**
  - `ban-all` command bans everyone in a server (except admins).
    - *Permission Required*: `BAN MEMBERS`

## Getting Started

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Create a `.env` file with the following variables:
   - `TOKEN`: Your Discord bot token.
   - `CLIENT_ID`: Your Discord bot client ID.
   - `GUILD_ID`: Your Discord guild ID.
4. Register the commands with `node source/register.js`.
5. Run `npm start`


### OR

Simply Invite the bot through [here](https://discord.com/api/oauth2/authorize?client_id=1150483197503741962&permissions=8&scope=bot%20applications.commands).

Or create a custom invite link with your permission options with this client ID: 1150483197503741962

## Usage

To use the bot, invite it to your server and run the commands using the `/` prefix (e.g., `/online`, `/raid`, etc.).

## Contributing

Feel free to open an issue or submit a pull request for any improvements or additional features you'd like to see.

## License

This project is licensed under the [MIT License](LICENSE).

## Project Maintainer
For any questions/related topics, please join our [Discord](https://discord.gg/BqxtPaSh46)

---

*Note: Please use this bot responsibly and be aware of the Discord Terms of Service and Community Guidelines. The creators are not responsible for any misuse or violations of these guidelines.*

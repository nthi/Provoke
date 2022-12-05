USE [master]
GO
IF db_id('Provoke') IS NULL
  CREATE DATABASE [Provoke]
GO
USE [Provoke]
GO

DROP TABLE IF EXISTS [Draft];
DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Placeholder];

CREATE TABLE [Draft] (
  [id] int PRIMARY KEY IDENTITY,
  [userId] int,
  [title] nvarchar(255),
  [content] nvarchar(1800),
  [dateCreated] datetime NOT NULL,
  [published] bit NOT NULL,
  [placeholderId] int
)
GO

CREATE TABLE [User] (
  [id] int PRIMARY KEY IDENTITY,
  [firstName] nvarchar(255),
  [lastName] nvarchar(255),
  [userName] nvarchar(255),
  [email] nvarchar(255),
  [normalMode] bit NOT NULL
)
GO

CREATE TABLE [Placeholder] (
  [id] int PRIMARY KEY IDENTITY,
  [quote] nvarchar(255),
  [author] nvarchar(255)
)
GO

ALTER TABLE [Draft] ADD FOREIGN KEY ([placeholderId]) REFERENCES [Placeholder] ([id])
GO

ALTER TABLE [Draft] ADD FOREIGN KEY ([userId]) REFERENCES [User] ([id])
GO

SET IDENTITY_INSERT [User] ON
INSERT INTO [User]
  ([Id], [firstName], [lastName], [userName], [Email], [normalMode])
VALUES 
  (1, 'Elaina', 'Doyle', 'piquant', 'elaina@email.com', 0);
INSERT INTO [User]
  ([Id], [firstName], [lastName], [userName], [Email], [normalMode])
VALUES 
  (2, 'Jane', 'Watson', 'curiosettee', 'jane@email.com', 1);
SET IDENTITY_INSERT [User] OFF

SET IDENTITY_INSERT [Placeholder] ON
INSERT INTO [Placeholder]
([Id], [quote], [author])
VALUES
(1, 'Colors are words'' little sisters. They can’t become soldiers.
I’ve love them secretly for a long time.
', 'From "Cobalt" by Rolf Jacobsen, trans Roger Greenwald');
INSERT INTO [Placeholder]
([Id], [quote], [author])
VALUES
(2, 'Bless your heart, Cooper hadn''t any more invention than a horse; and don''t mean a high-class horse, either; I mean a clothes-horse.', 'From "Fenimore Cooper''s Literary Offenses" by Mark Twain');
INSERT INTO [Placeholder]
([Id], [quote], [author])
VALUES
(3, '...you remove the band from a cigar before lighting it; otherwise you''ll be put down for a bounder…', 'Jeremy Brett as Sherlock Holmes in "The Illustrious Client"');
INSERT INTO [Placeholder]
([Id], [quote], [author])
VALUES
(4, 'We have talent. People call us
The leading poets of our day.
Too bad, our homes are humble,
Our recognition trivial.
', 'From "To Pi Ssu Yao" by Tu Fu, trans Kenneth Rexroth');
INSERT INTO [Placeholder]
([Id], [quote], [author])
VALUES
(5, 'I am the poet of reality
I say the earth is not an echo
Nor man an apparition;
But that all the things seen are real
', 'From "I am the Poet" by Walt Whitman');
INSERT INTO [Placeholder]
([Id], [quote], [author])
VALUES
(6, 'There is no one among men that has not a special failing;
And my failing consists in writing verses.
I have broken away from the thousand ties of life;
But this infirmity still remains behind.
', 'From "Madly Singing in the Mountains" by Po Chü-i, trans Arthur Waley');
INSERT INTO [Placeholder]
([Id], [quote], [author])
VALUES
(7, 'No one feels good at four in the morning.
If ants feel good at four in the morning
––three cheers for the ants. And let five o’clock come
If we’re to go on living.
', 'From "Four in the Morning" by Wislawa Szymborska, trans Magnus J. Krynski and Robert A. Maguire');
SET IDENTITY_INSERT [Placeholder] OFF


SET IDENTITY_INSERT [Draft] ON
INSERT INTO [Draft]
([id], [userId], [title], [content], [dateCreated], [published], [placeholderId])
Values
(1, 1, 'A trivial example', 'Prepared do an dissuade be so whatever steepest. Yet her beyond looked either day wished nay. By doubtful disposed do juvenile an. Now curiosity you explained immediate why behaviour. An dispatched impossible of of melancholy favourable. Our quiet not heart along scale sense timed. Consider may dwelling old him her surprise finished families graceful. Gave led past poor met fine was new.', '06-21-2020', 1, 1);
INSERT INTO [Draft]
([id], [userId], [title], [content], [dateCreated], [published], [placeholderId])
Values
(2, 1, 'A surfeit', 'Forfeited you engrossed but gay sometimes explained. Another as studied it to evident. Merry sense given he be arise. Conduct at an replied removal an amongst. Remaining determine few her two cordially admitting old. Sometimes strangers his ourselves her depending you boy. Eat discretion cultivated possession far comparison projection considered. And few glistening interested discovered inquietude insensible unsatiable increasing eat.', '06-22-2020', 1, 2);
INSERT INTO [Draft]
([id], [userId], [title], [content], [dateCreated], [published], [placeholderId])
Values
(3, 1, 'Far far', 'Allow miles wound place the leave had. To sitting subject no improve studied limited. Ye indulgence unreserved connection alteration appearance my an astonished. Up as seen sent make he they of. Her raising and himself pasture believe females. Fancy she stuff after aware merit small his. Charmed esteems luckily age out.', '06-23-2020', 0, 3);
INSERT INTO [Draft]
([id], [userId], [title], [content], [dateCreated], [published], [placeholderId])
Values
(4, 1, 'Just thinking', 'Game of as rest time eyes with of this it. Add was music merry any truth since going. Happiness she ham but instantly put departure propriety. She amiable all without say spirits shy clothes morning. Frankness in extensive to belonging improving so certainty. Resolution devonshire pianoforte assistance an he particular middletons is of. Explain ten man uncivil engaged conduct. Am likewise betrayed as declared absolute do. Taste oh spoke about no solid of hills up shade. Occasion so bachelor humoured striking by attended doubtful be it.
', '06-23-2020', 0, 4);
INSERT INTO [Draft]
([id], [userId], [title], [content], [dateCreated], [published], [placeholderId])
Values
(5, 2, 'On the other hand', 'For norland produce age wishing. To figure on it spring season up. Her provision acuteness had excellent two why intention. As called mr needed praise at. Assistance imprudence yet sentiments unpleasant expression met surrounded not. Be at talked ye though secure nearer.
', '06-21-2020', 1, 1);
INSERT INTO [Draft]
([id], [userId], [title], [content], [dateCreated], [published], [placeholderId])
Values
(6, 2, 'Cupcake ipsum', 'Croissant carrot cake bear claw halvah. Fruitcake cheesecake danish ice cream cotton candy biscuit. Lollipop topping gingerbread sesame snaps danish candy danish powder bear claw. Gummies jelly bear claw cupcake topping. Chupa chups ice cream pudding candy sweet bonbon soufflé carrot cake. Tiramisu candy canes pie donut icing shortbread gummi bears muffin. Jujubes cupcake croissant macaroon toffee tootsie roll chocolate cookie.', '06-22-2020', 1, 2);
INSERT INTO [Draft]
([id], [userId], [title], [content], [dateCreated], [published], [placeholderId])
Values
(7, 2, 'Pastry chocolate', 'Donut cake gingerbread cheesecake pudding. Marshmallow I love wafer chocolate cake I love. I love croissant jelly-o muffin gingerbread chocolate bar tootsie roll. Sugar plum chocolate bar pastry donut chocolate cake pie wafer wafer. Cake I love cake cake pastry. Shortbread cupcake cupcake tiramisu bonbon. I love carrot cake pastry cake chocolate sweet roll.', '06-23-2020', 0, 3);
INSERT INTO [Draft]
([id], [userId], [title], [content], [dateCreated], [published], [placeholderId])
Values
(8, 2, 'Leafy greens', 'Yolo ipsum dolor sit amet, consectetur adipiscing elit. Ut ac suscipit leo. Carpe diem vulputate est nec commodo rutrum. Pellentesque mattis convallis nisi eu and I ain’t stoppin until the swear jar’s full. Ut rhoncus velit at mauris interdum, fringilla dictum neque rutrum. Curabitur mattis odio at erat viverra lobortis. Poppin’ bottles on the ice, tristique suscipit mauris elementum tempus. Quisque ut felis vitae elit tempor interdum viverra a est. Drop it like it’s hot, at pretium quam. In nec scelerisque purus. Nam dignissim lacus ipsum, a ullamcorper nulla pretium non. Aliquam sed enim faucibus, pulvinar felis at, vulputate augue. Ten, ten, twenties on them fifties, trick, at tempus libero fermentum id. Vivamus ut nisi dignissim, condimentum urna vel, dictum massa. Donec justo yolo, rutrum vitae dui in, dapibus tempor tellus. I do it big. Fusce ut sagittis mi.', '06-24-2020', 0, 4);
SET IDENTITY_INSERT [Draft] OFF

